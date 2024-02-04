# MAIN CONFIG
These steps are only to start the project in an organized manner.
1. Create folders "pages", "components","interfaces", "services"
2. Import HttpClient in main.ts to use in future services:
```JavaScript
// main.ts

...

import { provideHttpClient } from '@angular/common/http';

...

bootstrapApplication(AppComponent, {
  providers: [
    
    ...
    
    provideHttpClient()

  ],
});

```
3. Create components "menu" and "header" to implement in app.component
4. Remove defined routes in "app/app.routes.ts" to build everything pointing to a component. 
    - This will allow the component to enter the "ionViewWillEnter" life cycle, important to update lists dynamically.

# COMPONENTS
* Components will be common structures for every page.

## app/app.component
* Container structure

## app/components/menu.component
* Menu pages
* Icons
* Router links

## app/components/header.component
* Side menu icon
* Page title

## app/components/products-by-section.component
* Organized list of products for a section:
  - Menu
  - Catering

## app/components/contact
* Contact form
* Social media list
* Locations map

## app/components/cms
All the CMS components, grouped by module