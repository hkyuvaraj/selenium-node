By default CucumberJS reads in all features from the /features directory relative to where the command was run

By default, CucumberJS will look for steps to be loaded within a folder titled step_definitions under the /features directory 
	relative to where you issue the command.

You can optionally use the -r option to have CucumberJS load steps from another location in the package.json like below. 
	./node_modules/.bin/cucumber-js -r features/your_step_definitions_loc
	
Node-config reads configuration files in the ./config directory for the running process, typically the application root. This can be overridden by setting the $NODE_CONFIG_DIR environment variable to the directory containing your configuration files.

To run a script: npm run test-mobile

Check this for promises - http://blog.scottlogic.com/2015/03/04/webdriverjs-and-promises.html	