# kaoo-app
A react-native app for a restaurant.

## Usage
The CI will build unsigned APKs. There is configuration for iOS, but I did not test it after getting it to work initially. (Feel free to open PRs!).

## Special Features
- [x] Checklist
  - Every time we went there with more than two people, checking who has ordered what was a pain. Now, there is a checklist!
- [x] Saved carts
- [x] Lazy Loading
  - The webinterface loads all the images at once, which will make first load really slow (all images are ~2MB)
  - The app implements lazy loading on scroll and caches the images

### Backstory
I sometimes go to a all-you-can-eat restaurant. This restaurant has a website for ordering the food. It works by scanning a QR Code which has a URL to the web-interface with the table number encoded. Then, it will make some api calls and display a list. So, because the webinterface has some flaws, I just reverse-engineered it (definetly not an excuse to eat there) and built an app with it. There are also some bonus-features like saving carts for later and having a checklist.
