# 🎮Game Store
 This is my web application with Angular - a website where you can buy games at low prices. Application contains functionalities like creating and logging into your account, adding additional 
 information in the profile page. Creating, updating and deleting offers. Uses a Firebase: Firestore for the Back-End.

# ⬇️Instalation
Download using this code:
```
git clone https://github.com/muki01/Game_Store-Angular.git
```
Install using this code:
```
npm install
```
Start using this code:
```
ng serve
```
Open in browser using this link:
```
localhost:4200
```

# 👨‍💻Test Profiles
* elon123@gmail.com pass: 123456; (Admin)
* tony123@gmail.com pass: 123456; (User)

# Navigation
* Not logged in user
  ![header](https://github.com/muki01/Game_Store-Angular/assets/75759731/74be734d-3070-4bd6-b681-0ae7ab893225)
* Logged-in user (not Admin)
  ![header](https://github.com/muki01/Game_Store-Angular/assets/75759731/f062e039-a9ff-4106-950c-f204d9a1fbb8)
* Logged-in user (Admin)
  ![header](https://github.com/muki01/Game_Store-Angular/assets/75759731/f5b5045a-3f95-494e-87f8-0d375d8f3771)

# Home Page
This page is public for all users.

  ![home](https://github.com/muki01/Game_Store-Angular/assets/75759731/77a3b540-c553-4681-8b24-575695e7fe28)

# Login Page
The user logs in with their email and password.
* Email address must be a valid one.
* Password should be at least 6 characters.

![login](https://github.com/muki01/Game_Store-Angular/assets/75759731/5c2625fc-ccf1-4a42-a4ad-e0889dba2ed9)

# Register Page
The users registers in with username, email, password and confirm password. Valid inputs are:
* Username and Email must not have been used.
* Username should be at least 3 characters.
* Email address must be a valid one.
* Password should be at least 6 characters.
* Confirm password and password should match.

* All fields have to be entered.
  
![register](https://github.com/muki01/Game_Store-Angular/assets/75759731/9cebb5c2-f6eb-448a-a085-24edbbedf4c8)

# Create new game
Page only available for logged in Admin users.
Create offer form expects as input: name, gameType, imageURL, description, price and downloadURL for the game.
* Name should be at least 3 characters.
* Descrition should be at least 10 characters.
* URL fields must start with 'http://' or 'https://'
* All fields have to be entered for the game to be created.

![create](https://github.com/muki01/Game_Store-Angular/assets/75759731/5f146b04-3cbf-4fef-b6c4-da752bfb5409)


# Profile Page
Page only availabel for logged in users. Users have Balance and can add or update information for them and upload profile picture.
If you have enough balance you can buy games

![profile](https://github.com/muki01/Game_Store-Angular/assets/75759731/840750dc-d3d1-41e5-ac5a-321f50b036d5)

# Game Category Page
This is one of the categorized games pages. This page contains only the selected category of games. For example in the picture shown (action games)

![category](https://github.com/muki01/Game_Store-Angular/assets/75759731/65efded0-3b00-49c0-b3ec-62bd1187b5f8)

* If there are no games

![category](https://github.com/muki01/Game_Store-Angular/assets/75759731/79cbfef2-288a-4e38-83df-db7a1b2b4d52)

# Details Page
This page contains the details for each game offer.
Where logged in users can buy and download the game
If logged in users is Admin, can edit or delete the offer.

* Not Logged in user
  
  ![details](https://github.com/muki01/Game_Store-Angular/assets/75759731/9bb346dc-2e5b-40eb-87cb-2f9340d20482)


* Logged in user (Not Admin)
  
  ![details](https://github.com/muki01/Game_Store-Angular/assets/75759731/69acdeba-1c6a-4d79-80a6-1b76c01e055c)

* Logged in user (Admin)
  
  ![details](https://github.com/muki01/Game_Store-Angular/assets/75759731/3c316c9d-936f-47cb-8c77-e49e99b6a123)

* If game is purchased
  
  ![details](https://github.com/muki01/Game_Store-Angular/assets/75759731/b149f0f5-8f1f-4b9e-ac7e-527f36a589ab)


# Edit Page
Edit page where logged in Admin users can update Game offers

![edit](https://github.com/muki01/Game_Store-Angular/assets/75759731/e2a77f80-092c-448e-baf4-72a169fe9972)


# 404 Not Found
404 page comes when you try to access routes that don't exist.

![404](https://github.com/muki01/Game_Store-Angular/assets/75759731/aa8bc159-ddb6-45b9-ac81-57bc51c7c38f)
