/*global describe, beforeEach, afterEach, it, __dirname, require*/
(function() {
	"use strict";

	var path = require("path");
	var helpers = require("yeoman-generator").test;
	var utils = require("../utils");

	describe("openui5 app generator", function() {
		beforeEach(function(done) {
			helpers.testDirectory(path.join(__dirname, "temp"), function(err) {
				if (err) {
					return done(err);
				}

				this.app = helpers.createGenerator("openui5:app", [
					"../../app",
					"../../view"
				]);

				done();
			}.bind(this));
		});

		afterEach(function() {
			utils.deleteFolderRecursive(path.join(__dirname, "temp"));
			//done();
		});

		it("creates expected files with args", function(done) {
			var mockPrompts = {
				applicationName: "My Application",
				appDescription: "Test Description",
				authorName: "John Doe",
				gitRepository: "ssh://github.com/ropository/url.git",
				licenseType: "Apache License, Version 2.0",
				applicationType: "classical",
			};

			var expected = [
				"css/style.css",
				"ext/.gitkeep",
				"test/.gitkeep",
				"i18n/messageBundle.properties",
				"img/.gitkeep",
				"model/Config.js",
				"model/img.json",
				"util/.gitkeep",
				"index.html",
				"Gruntfile.js",
				".jshintrc",
				"bower.json",
				"package.json",
				"README.md",
				"view/Main.controller.js",
				"view/Main.view.js",
				"Application.js"
			];

			helpers.mockPrompt(this.app, mockPrompts);

			// Test the view generation in this case via parameter
			this.app.args = ["Main", false];
			this.app.options["skip-install"] = true;
			this.app.run({}, function() {
				helpers.assertFiles(expected);
				done();
			});
		});

		/*
        Unable to un-comment this just yet (as of 6/1/14). The yeoman generator-generator 
        module has a bug in the helpers#testDirectory function that stops refreshing (clearing
        out) the temp directory (on Windows).
        A fix has been merged into master for generator-generator (https://github.com/yeoman/generator/pull/451)
        but this has not made it to npmjs yet.

        it( "fiori app gen creates expected files with args", function( done ) {
            var mockPrompts = {
                applicationName: "My Application",
                appDescription: "Test Description",
                authorName: "John Doe",
                gitRepository: "ssh://github.com/ropository/url.git",
                licenseType: "Apache License, Version 2.0",
                features: "" // No added features
            };
            var expected = [
                "css/style.css",
                "ext/.gitkeep",
                "test/.gitkeep",
                "i18n/messageBundle.properties",
                "img/.gitkeep",
                "model/Config.js",
                "model/img.json",
                "util/.gitkeep",
                "index.html",
                "Gruntfile.js",
                ".jshintrc",
                "bower.json",
                "package.json",
                "README.md",
                "view/Main.controller.js",
                "view/Main.view.js",
                "Application.js"
            ];

            helpers.mockPrompt( this.app, mockPrompts );

            this.app.args = [ "Main", false ];
            this.app.options[ "skip-install" ] = true;
            this.app.run( {}, function() {
                helpers.assertFiles( expected );
                done();
            } );
        } );
        */
	});

	describe("openui5 view generator", function() {
		beforeEach(function(done) {
			//helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
			//  if (err) {
			//      return done(err);
			//  }

			this.view = helpers.createGenerator("openui5:view", [
				"../../view"
			]);

			done();
			//}.bind(this));
		});

		it("creates expected files with args", function(done) {
			var expected = [
				"view/Test.controller.js",
				"view/Test.view.xml"
			];

			helpers.mockPrompt(this.view, {
				viewName: "Test",
				viewType: "xmlView"
			});

			this.view.run({}, function() {
				helpers.assertFiles(expected);
				done();
			});
		});
	});
}());