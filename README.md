# Sina Taavon 17067258

Here are some information about the application.


## Global Variable

There is a global variable on `index.js` file called `global.BASE_URL` where you can change to any IP address you want to use.

## Starting the application

I am using `react-native-paper` where on the development stage it encounters a known issue (known issue for the developers of the framework). There is a work around to fix this issue. Please reload the app once it has been installed and if the app is frozen just reopen it again and the issue should disappear. 

I have contacted them and they said there will be fix for this issue but I don't think I will get it on time for this assignment. 

Whole application should run by `npm install` and `npx react-native run-android`

There should not be any requirements for any additional settings, Tested on 2 different Windows and 1 Mac OS machines.

## Profanity filter

Profanity filter has been added and here are the filtered words  `['cake', 'muffin', 'biscuit', 'cakes', 'muffins', 'biscuits', 'croissant', 'croissants', 'bread']`  

## ESlint and Formats

The application is using JavaScript standard format and formatting of the code is done by `Prettier.io` powered by `ESlint`

## Structure and hierarchy

`index.js` is the parent file where hosts `App.js` file where the main `navigation` is placed. 

The `NavigationContainer` is wrapped around the `App.js` so there is no need to include them on every single page.

There are 2 folders in components `navigations` and `pages`. `navigations` is responsible for the housing of the pages. and `pages` are the main screens of the application.

## Status handling

Each `fetch` is using a `statusCodeHandler` function which handles all the necessary response code by a `switch` statement.

## Screencast link

[Screencast of the application running on Android emulator](https://drive.google.com/file/d/18MpApPFVabF2-mEAQzxqTSzNRAgVMwzY/view?usp=sharing)

## GitHub link

[Repository link](https://github.com/ParentCompany/sina-elective-2021)
