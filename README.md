# SKELETON DEVELOPMENT WORKFLOW


## Why use a workflow

A development workflow is a way to help speed up development time and create more organized code by automating tasks and enabling preprocessors.

##### Including:
* Loading up a local web server
* Reloading the browser automatically whenever a file is saved
* Using preprocessors like jade or postcss
* Combining files in JavaScript, html, etc.
* Optimizing images
* Creating Production ready code through minifiers

## Setting Up Your Machine

This is only needed the very first time. Once your machine is setup, you won't need to do it again.

### Install Node & Command Line Tools

In my design common folder, in the **dev tools** install both "Node" & "Command Line Tools"


### Update Ruby

In terminal type this and then your password:

```
sudo gem update
```

### Install Gulp

Once that is finished, again in terminal type:

```
sudo npm install -g gulp
```

### Install Sass and Compass

Two more terminal commands to install sass and compass:

```
sudo gem install sass
```

```
sudo gem install compass
```

## Using Gulp

There are two main task runners that you will typically see for setting up development workflows. These are [Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/). We will be using Gulp because the configuration tends to be easier to write, but you typically see both used frequently.

### First: Open Environment in Terminal

With terminal in your dock, drag the parent folder to terminal icon in your dock. This will open a window with the directory selected.

Alternatively with terminal window already open, you type "cd " and then drag the parent folder to the window and press enter.

### Second: Install packages (First Use Only)

Only on the very first time of copying over a development process, you will need to install all the packages needed. To accomplish this type:

```
npm install
```

### Lastly: Start Gulp (Every Time)

To run the automated tasks in the environment, type the command:

```
gulp
```

### If Errors happen

Keep your terminal open and if any errors happen when coding, Terminal will log them. Once you have fixed the error, start gulp up again by typing:

```
gulp
```

### Quitting Gulp

When you are done working on the file and want to stop the tasks, press:

```
control & c
```

##### Docs

[http://gulpjs.com/](http://gulpjs.com/)

## Gulp Workflow Contents

While most of you probably won't ever need to write your own workflow or tasks, it's still important to know what is happening.

### Starting a new workflow from scratch

In a new folder, type:

```
npm init
```

Answer all the questions like giving it a name, version and description. The important one that you need to answer is **entry point** and this needs to be **"gulpfile.js"**

### Creating a gulpfile.js

After running though the whole list of questions, you are to tell gulp what to automate. Create a new file in this folder and call it **"gulpfile.js"**

### Install Packages

Gulp uses NPM to install Plugins, which stands for "Node Package Manager." Using NPM enables you find and reuse packages of code.

Plugins have to be installed before any tasks will work. These include like gulp, preprocessors like jade and postcss and things like minifiers and concating for JavaScript.

To do this type

```
npm install --save-dev gulp
```

Repeat this for all plugins you need, replacing "gulp" with the plugin's name. You can also chain these together to save time

```
npm install --save-dev gulp gulp gulp-uglify gulp-concat browser-sync
```

> Note: the --save-dev is a way to add these to the package file, so when another developer picks up the file they can just run npm install without having to chase down all the packages needed.

> Note: Packages that are needed on the production side and through browserify use --save instead of --save-dev. This can be plugins like jquery, bootstrap or underscore.

##### Packages available

[https://www.npmjs.com/](https://www.npmjs.com/)

## Editing The Gulpfile.js

You can edit the gulpfile.js to automate your tasks and plugins that you are using for development process. This is done by creating tasks and running them on load and then watching for changes to certain files to tell them run when changes occur.

### Include Packages

The first step is to import all your different plugins and storing them in variables so you can use them in your tasks. Repeat for all plugins. For example:

```
var gulp = require('gulp');
```

### Gulp Tasks

Next you create the tasks that you want run. You do this by telling the task the location of the files desired and what type of files. Then you run through a chain of transformations that you want to happen. For example:

```
gulp.task('jade', function() {
    return gulp.src('Development/jade/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest("Production/"));
});
```
> In this case, we are creating a task called 'jade' and pulling in files with the extension ".jade" from the "Development/jade" folder. We then run those files through the jade plugin, which turns the jade into html and we place the end files in the root of the "Production" folder.

> Plugins will typically have documentation that will help show you how to use. Or there's always google.

### Gulp Default Task

No tasks get ran on load except for a "default" task. So to get all our tasks ran when we start up "gulp", we add them to our default task like:

```
gulp.task('default', ['jade', 'postcss', 'react', 'json', 'includes', 'watch', 'sync']);
```

> Where jade, postcss, react, json, includes, watch and sync are all tasks that we have created.

### Gulp Watch

To keep gulp updating our files as we edit them, we create watch files to tell our code to watch certain types of files and if changes occur within them to run the tasks associated with that type of file.

```
gulp.task('watch', function() {
    gulp.watch('Development/jade/**/*.jade', ['jade']);
    gulp.watch('Development/react/**/*.jsx', ['react']);
    gulp.watch('Development/css/**/*.css', ['postcss']);
    gulp.watch('Development/data/**/*.json', ['json']);
    gulp.watch('Development/includes/**/*', ['includes']);
    gulp.watch(['Production/**/*']).on('change', browserSync.reload);
});
```

### Using BrowserSync to create a local server

In our case, we are using browsersync (which is a plugin that we install) to create a local server. Through our watch task, we reload this on any changes that occur.

```
gulp.task('sync', function() {
    browserSync.init({
        server: {
            baseDir: "Production/",
            middleware: [historyApiFallback()]
        }
    });
});
```

> Note: Browsersync creates both a local and remote path so you can open your files on multiple devices and they all update and stay in sync with changes and as you click through the site.

## Tutorials

#### Gulp Workflow:

[https://www.lynda.com/Web-Design-tutorials/Web-Project-Workflows-Gulp-js-Git-Browserify/154416-2.html](https://www.lynda.com/Web-Design-tutorials/Web-Project-Workflows-Gulp-js-Git-Browserify/154416-2.html)

#### Postcss

[https://www.lynda.com/CSS-tutorials/Building-Responsive-Single-Page-Design-PostCSS/417644-2.html](https://www.lynda.com/CSS-tutorials/Building-Responsive-Single-Page-Design-PostCSS/417644-2.html)

#### Jade

[https://www.youtube.com/watch?v=Hlpz1bTfbn4&list=PLVHXiuTtgtcxuckHJUzrpe2n9gNIVF6JE](https://www.youtube.com/watch?v=Hlpz1bTfbn4&list=PLVHXiuTtgtcxuckHJUzrpe2n9gNIVF6JE)

#### Bootstrap

[https://www.lynda.com/Bootstrap-tutorials/Bootstrap-3-Essential-Training/417641-2.html](https://www.lynda.com/Bootstrap-tutorials/Bootstrap-3-Essential-Training/417641-2.html)

#### React

[https://www.lynda.com/React-js-tutorials/Learn-React-js-Basics/379264-2.html](https://www.lynda.com/React-js-tutorials/Learn-React-js-Basics/379264-2.html)

#### ECMAScript 6 (ES6 JS)

[https://www.lynda.com/JavaScript-tutorials/Up-Running-ECMAScript-6/424003-2.html](https://www.lynda.com/JavaScript-tutorials/Up-Running-ECMAScript-6/424003-2.html)

#### Git and Github

[https://www.lynda.com/Git-tutorials/Up-Running-Git-GitHub/409275-2.html](https://www.lynda.com/Git-tutorials/Up-Running-Git-GitHub/409275-2.html)

## Others Not Used

#### AngularJS 2

[https://www.lynda.com/AngularJS-tutorials/Learn-AngularJS-2-Basics/428058-2.html](https://www.lynda.com/AngularJS-tutorials/Learn-AngularJS-2-Basics/428058-2.html)

#### SASS

[https://www.lynda.com/Sass-tutorials/Sass-Essential-Training/375925-2.html](https://www.lynda.com/Sass-tutorials/Sass-Essential-Training/375925-2.html)

#### Coffeescript

[https://www.lynda.com/Developer-Web-Design-tutorials/Up-Running-CoffeeScript/154415-2.html](https://www.lynda.com/Developer-Web-Design-tutorials/Up-Running-CoffeeScript/154415-2.html)
