FROM alpine:3.21
RUN apk update && apk add docker curl aws-cli

COPY ./rootfs /

ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]