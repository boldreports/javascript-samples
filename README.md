# Reports JavaScript samples

## Pre-requisite

* Install stable `NodeJs` from https://nodejs.org and run `node -v` to check whether it is installed properly or not.

* Install gulp package with global access by executing the below command  and run `gulp -v` to check whether it is installed properly or not.

```cmd
npm install gulp -g
```


## Document Structure

The Reports JavaScript samples should be placed inside the `src/controls` location.

Refer the below folder structure for further details.

    --> src
      --> controls (1)
                --> default (2)
                   --> defaul.html (3)
                   --> default.js (4)
                --> invoice (2)
                   --> invoice.html (3)
                   --> invoice.js (4)
                --> samples.json (5)

(1). This is where all our `reports samples` should be placed.

(2). This is our sample folder and this folder will contains HTML and js file.

(3). This is our sample `HTML` file.

(4). This is our sample `JS` file.

(5). This is our sample configuration file.

```json
{
  "samples": [{
      "routerPath": "default",
      "sampleName": "Default Functionalities",
      "directoryName": "default",
      "imageDetails": {
        "imageName": "default.png",
        "isLandscape": false
      },
      "metaData": {
        "description": "default sample",
        "tags": "ej"
      }
    },
    {
      "routerPath": "invoice",
      "sampleName": "Invoice",
      "directoryName": "invoice",
      "imageDetails": {
        "imageName": "default.png",
        "isLandscape": true
      },
      "metaData": {
        "description": "invoice sample",
        "tags": "ej"
      }
    }
  ]
} 

```
`samples` - This is an array which contains all samples information.

`routerPath` - This is the our sample navigation path.

`sampleName` - This is our sample name which will be rendered in table of contents.


`directoryName` - This is our sample directory name.

`imageDetails.imageName` - This is our sample image name which will be rendered in table of contents.

Note : keep your sample images in `assets/sidebar` folder.

`imageDetails.isLandscape` - if it is true, your sample image will be renderend in lansscape mode else it will be renderend in portrait mode.

`metaData.description` - This is our sample description.

`metaData.tags` - This is our sample important tags.

## QuickStart 

After completing prerequisite steps, Follow the below steps to run Reports JavaScript samples 

Clone the repo from https://gitlab.syncfusion.com/data-science/reports-javascript-samples from `development` branch.


Run `npm install` from the cloned root folder.


Run `gulp serve` to serve the application

## Gulp Tasks

The below gulp tasks can be used to build and serve the documentation.


Run the below command to serve the application. After running the command, Navigate to [localhost:9000](http://localhost:9000).

```cmd
    gulp serve
```

Run the below command to test ts lint.

```cmd
    gulp ts-lint
```

Run the below command to test file name validation.

Note: This task will throw error on using custom file names . For that, we need to include these names(need to have valid reason for using these custom names) in `customNames` array in `src/controls/samples.json` file.

```cmd
    gulp file-validation
```

Run the below command to test ts lint and file name validation.

```cmd
    gulp test
```
## Pre-requisite for Including New Image for New Report

kindly increase the background width `src/common/sidebar/sidebar.css` of css class 

Portrait: `.ej-sidebar-content .ej-sb-toc .ej-sb-toc-card .ej-portrait-img` or


Landscape: `.ej-sidebar-content .ej-sb-toc .ej-sb-toc-card .ej-landscape-img`
```cmd
background-height = current-height + 100%;
```