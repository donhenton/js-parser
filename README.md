# JS-parser

Simple logic parser

## Unit tests

* gulp test
* reports are located in the target/test_reports folder
* jasmine_unit_tests.html report of tests
* target/html_coverage/jasmine-phantom/index.html istuanbul coverage report

## Demo

<https://donhenton.github.io/js-parser/public_html/>

## Jenkins File Notes

The Jenkins file is set up for a Docker based version of Jenkins. See
<https://github.com/donhenton/udemy-docker/blob/master/jenkins-server/docker-compose.yml>
The build will need to be parameterized to specify ${CERT_LOCATION} which is actually the user name on a Mac
the stuff about ssl-installs and ssl-certs are locations determined by the docker-compose file for
pointing to self signed certs, if needed. This particular jenkins file is tied to the above docker-compose file and
is fairly idiosyncratic. The mapped volumes were used to deal with self-signed cert issues.

### Build Properties

    * parameterized (CERT_LOCATION)
    * pipeline script from SCM
    * git
    * specify branch if needed (jenkins-branch)

<https://medium.com/front-end-weekly/karma-js-headless-chrome-and-docker-35c134df28f3>
