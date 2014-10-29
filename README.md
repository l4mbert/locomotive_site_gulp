# Gukp for Locomotive sites

A Gulp file to be used when developing Locomotive sites.  The following tasks are available:

* [watch](#watch-task)
* `production`
* `upload-assets-to-s3`

## Where to place the repository

Please make sure that the folder of the 'locomotive_site_gulp' respository is located on the same level as the 'locomotive_sites' respository.  The Gulpfile is kept seperate from 'locomotive_sites' as there is a conflict with the Gems in use.

## Watch - task

## Amazon IAM keys

I currently keep Amazon IAM keys within a folder named 'keys', in the repository folder.  Gitignore is set up to ignore files within this folder, and the Gulpfile is setup to reference the 'keys' folder.  The key file shoud be a `.json` file, and have the contents:

```
{
  "key": "INSERTKEY",
  "secret": "INSERTSECRET",
  "bucket": "INSERTBUCKETNAME",
  "region": "eu-west-1"
}
```
