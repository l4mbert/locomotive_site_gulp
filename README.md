# Gulp for Locomotive sites

A Gulp file to be used when developing Locomotive sites.  The following tasks are available:

* [watch](#watch---task)
* [production](#production---task)
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

## upload-assets-to-s3 - task

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
