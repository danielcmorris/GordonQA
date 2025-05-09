# Gordon QA
This project is designed to manage testing of multiple projects and their features.

## Projects
A project could be a full website or even a subset of a website.  For example, you might have one team in charge of the admin module for your website.  And that admin module is
fairly "stand alone" and changes to that site should not affect other portions of the site.  

## Features
Each project is made up of multiple features.  These may generally be the entire webpage.  So, perhaps you have a Warehouse editor in  your admin module.  That would then be a 
feature that you need to maintain a series of tests for.

## Tests
A test is a very simple set of steps that each have a description and an expectation.  If you don't meet the expectation, the test fails.  

## Test Sets
Generally, tests are done in Sets.  So you may need one or more tests, each with their own steps, attached to a set that one QA person will be handling.



## Test Templates
Tests may need to be run multiple times.  Not just because you may fail, but whenever you make a change to the feature, it's necessary to run _all_ the feature tests again.  So
you create a series of test templates for each feature.  When a change is made, you need to choose to implement one or more of those tests to ensure your change has not 
broken the feature.

### Test Template Items
The items within a test template are a simple series of steps that are described and then the expected result is written.  Each test template will have one or more steps.

## Test Set Usage
So you may have a change to the Warehouse form and have added a new field and a button.  So you'll probably want to test that the form
saves changes and __all__ the fields are updating correctly.  The new field is going to be required, so you have that test for required fields.  The Button is to validate the address
of the warehouse with google, so you'll need a test for that.  You'd simply go to the Feature, select one or more tests from the templates and generate a new "Set".  