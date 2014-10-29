# Gulp for Locomotive sites

A Gulp file to be used when developing Locomotive sites.  The following tasks are available:

* [watch](#watch---task)
* [production](#production---task)
* [upload-fonts-to-s3](#upload-fonts-to-s3---task)
* [upload-assets-to-s3](#upload-assets-to-s3---task)
* [encrypt-keys](#encrypt-keys---task)
* [decrypt-keys](#decrypt-keys---task)

Hopefully the tasks provided through the master branch of this repository fulfils what you need.  If not, and you need to modify the Gulpfile, please create a new branch with the name of the project.

## Where to place this repository

Please make sure that you clone, and locate this repository on the same directory level as the 'locomotive_sites' respository.

The Gulpfile (in this repository) is kept seperate from 'locomotive_sites' as it allows us to manage and improve it in isolation.

## watch - task

`$ gulp watch`

The default task, which will compile SASS and CoffeeScript files upon change.

## production - task

`$ gulp production`

This task will prepare site assets for the production environment.  It will currently do the following:

* Minify the site CSS file
* Concatenate and uglify the site JavaScript.

The final files **will be placed in a folder titled 'production'**, sitting in either _/public/javascript_ or _/public/stylesheets_.

### JavaScript concatenation order

If you need to modify (or add to) the JavaScript concatenation order, please create a new branch with the name of the project.  You can then edit the Gulpfile and make it specific to the project.  If you need help please ask.

## upload-fonts-to-s3 - task

`$ gulp upload-fonts-to-s3 --key_file=your-keys-files.aws.json`

If you are creating a site which is purely Locomotive, the only assets you will need to host on S3 are the font files.  Use this task to upload font files to S3.

## upload-assets-to-s3 - task

`$ gulp upload-assets-to-s3 --key_file=your-keys-files.aws.json`

If you are creating a site which also has a Wordpress blog, or shares it's assets with another system, then you may need to move all public assets to S3.  To do so, use this task.

_Please_ note that Locomotive does a good job of storing assets on S3.  If you don't need to share assets with another system, it's best to let Locomotive handle assets.

## encrypt-keys - task

`$ gulp encrypt-keys`

In order to store Amazon S3 keys in GitHub we must encrypt them.  This task will encrypt any files which end in '.aws.json', and move them to the folder titled 'encrypted'.  If you create a new Amazon S3 key file, please encrypt it.

## decrypt-keys - task

`$ gulp decrypt-keys`

