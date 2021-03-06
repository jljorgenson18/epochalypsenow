variable "bucket_name" {}
variable "hosted_zone" {}
variable "domain_name" {}

variable "region" {
  default = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "epochalypsenow-infrastructure-state"
    key    = "default/terraform.tfstate"
    region = "us-east-1"
  }
}

locals {
  cloudfront_hosted_zone_id = "Z2FDTNDATAQYW2"
}

provider "aws" {
  region = "${var.region}"
}

// S3
resource "aws_s3_bucket" "b" {
  bucket = "${var.bucket_name}"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "b" {
  bucket = "${aws_s3_bucket.b.id}"

  policy = <<POLICY
{
  "Version": "2008-10-17",
  "Statement": [
      {
          "Sid": "AllowPublicRead",
          "Effect": "Allow",
          "Principal": {
              "AWS": "*"
          },
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::${aws_s3_bucket.b.id}/*"
      }
  ]
}
POLICY
}

// CloudFront

data "aws_acm_certificate" "cert" {
  domain   = "${var.hosted_zone}"
  statuses = ["ISSUED"]
}

resource "aws_cloudfront_distribution" "cf" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["${var.domain_name}"]

  price_class = "PriceClass_All"

  default_root_object = "index.html"

  origin {
    domain_name = "${aws_s3_bucket.b.bucket_domain_name}"
    origin_id   = "S3-${aws_s3_bucket.b.id}"
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 403
    response_code         = 404
    response_page_path    = "/index.html"
  }

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    target_origin_id       = "S3-${aws_s3_bucket.b.id}"
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 600
    max_ttl                = 900

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  viewer_certificate {
    acm_certificate_arn = "${data.aws_acm_certificate.cert.arn}"
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

// DNS

data "aws_route53_zone" "selected" {
  name = "${var.hosted_zone}."
}

resource "aws_route53_record" "A" {
  zone_id = "${data.aws_route53_zone.selected.zone_id}"
  name    = "${var.domain_name}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.cf.domain_name}"
    zone_id                = "${local.cloudfront_hosted_zone_id}"
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "AAAA" {
  zone_id = "${data.aws_route53_zone.selected.zone_id}"
  name    = "${var.domain_name}"
  type    = "AAAA"

  alias {
    name                   = "${aws_cloudfront_distribution.cf.domain_name}"
    zone_id                = "${local.cloudfront_hosted_zone_id}"
    evaluate_target_health = true
  }
}
