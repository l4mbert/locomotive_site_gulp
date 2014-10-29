# Gulp for Locomotive sites

A Gulp file to be used when developing Locomotive sites.  The following tasks are available:

* [watch](#watch---task)
* [production](#production---task)
* [upload-fonts-to-s3](#upload-fonts-to-s3---task)
* [upload-assets-to-s3](#upload-assets-to-s3---task)

Hopefully the tasks provided through the master branch of this repository fulfils what you need.  If not, and you need to modify the Gulpfile, please create a new branch with the name of the project.

## Where to place the repository

Please make sure that the folder of the 'locomotive_site_gulp' respository is located on the same level as the 'locomotive_sites' respository.  The Gulpfile is kept seperate from 'locomotive_sites' as there is a conflict with the Gems in use.

## watch - task

The default task, which will compile SASS and CoffeeScript files upon change.

## production - task

This task will prepare site assets for the production environment.  It will currently do the following:

* Minify the site CSS file
* Concatenate and uglify the site JavaScript.

The final files **will be placed in a folder titled 'production'**, sitting in either `\public\javascript` or `\public\stylesheets`.

### JavaScript concatenation order

If you need to modify (or add to) the JavaScript concatenation order, please create a new branch with the name of the project.  You can then edit the Gulpfile and make it specific to the project.  If you need help please ask.

## upload-fonts-to-s3 - task

If you are creating a site which is purely Locomotive, the only assets you will need to host on S3 are the font files.  Use this task to upload font files to S3.  Please read about [Creating and specifying](#creating-and-specifying-amazon-s3-keys) S3 authentication details.

## upload-assets-to-s3 - task

If you are creating a site which also has a blog, or shares it's assets with another system, then you may need to move all public assets to S3.  To do so, use this task.  Please read about [Creating and specifying](#creating-and-specifying-amazon-s3-keys) S3 authentication details.

_Please_ note that Locomotive does a good job of storing assets on S3.  If you don't need to share assets with another system, it's best to let Locomotive handle assets.

## Creating and specifying Amazon S3 keys

I currently keep Amazon IAM keys within a folder named 'keys', in the repository folder.  Gitignore is set up to ignore files within this folder, and the Gulpfile is setup to reference the 'keys' folder.  The key file shoud be a `.json` file, and have the contents:

```
{
  "key": "INSERTKEY",
  "secret": "INSERTSECRET",
  "bucket": "INSERTBUCKETNAME",
  "region": "eu-west-1"
}
```
