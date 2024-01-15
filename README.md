# 🎮Game Store
 This is my web application with Angular - a website where you can buy games at low prices. Application contains functionalities like creating and logging into your account, adding additional 
 information in the profile page. Creating, updating and deleting offers. Uses a Firebase: Firestore for the Back-End.

 You can test this app in this link http://gamestore1.rf.gd

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
I will not give an account that is an administrator because there are people who delete all posts. 😁
* elon123@gmail.com pass: 123456; (Creator)
* tony123@gmail.com pass: 123456; (User)

# Navigation
* Not logged in user
  ![header](https://github.com/muki01/Game_Store-Angular/assets/75759731/a0407578-f0e8-4bc6-8660-659ae16743c2)
* Logged-in user (not Admin and not Creator)
  ![header](https://github.com/muki01/Game_Store-Angular/assets/75759731/bd0c5b7a-f9b8-4fa8-ade1-3cfb398ef83f)
* Logged-in user (Admin or Creator)
  ![header](https://github.com/muki01/Game_Store-Angular/assets/75759731/eec49e57-258f-4c63-8d85-e6fee17f33ad)

# Home Page
This page is public for all users.

  ![home](https://github.com/muki01/Game_Store-Angular/assets/75759731/c9603d99-55eb-4c3a-8067-88afd9b60efc)

# Login Page
The user logs in with their email and password.
* Email address must be a valid one.
* Password should be at least 6 characters.

![login](https://github.com/muki01/Game_Store-Angular/assets/75759731/e5940aa7-46d6-4507-92d6-93cbc282ec35)

# Register Page
The users registers in with username, email, password and confirm password. Valid inputs are:
* Username and Email must not have been used.
* Username should be at least 3 characters.
* Email address must be a valid one.
* Password should be at least 6 characters.
* Confirm password and password should match.

* All fields have to be entered.
  
![Register](https://github.com/muki01/Game_Store-Angular/assets/75759731/50dcced8-0fbc-47f6-9b19-a7bab3d427d1)

# Create new game
Page only available for logged in Admin and Creator users.
Create offer form expects as input: name, gameType, imageURL, description, price and downloadURL for the game.
* Name should be at least 3 characters.
* Descrition should be at least 10 characters.
* URL fields must start with 'http://' or 'https://'
* All fields have to be entered for the game to be created.

![Create Game](https://github.com/muki01/Game_Store-Angular/assets/75759731/be7e7a23-962d-4c8f-9d2e-e510f554d437)

# Profile Page
Page only availabel for logged in users. Users have Balance and can add or update information for them and upload profile picture.
If you have enough balance you can buy games

![Profile](https://github.com/muki01/Game_Store-Angular/assets/75759731/f73ca479-f644-4b10-9ce3-ffda9aab5b44)

# Game Category Page
This is one of the categorized games pages. This page contains only the selected category of games. For example in the picture shown (action games)

![Category Page](https://github.com/muki01/Game_Store-Angular/assets/75759731/0422f6a0-c505-441b-b5ee-8d8c4acb483d)

* If there are no games

![No Games](https://github.com/muki01/Game_Store-Angular/assets/75759731/e142e100-312b-4560-a3e0-f47efe3cd618)


# Details Page
This page contains the details for each game offer.
Where logged in users can like, buy and download the game
If logged in users is Admin, can edit or delete all posts.
If the logged in user is a Creator, they can only edit or delete posts they created.

* Not Logged in user
  
![Game Details (Not logged)](https://github.com/muki01/Game_Store-Angular/assets/75759731/3da4f225-7159-44ce-be7b-1ab19b841979)

* Logged in user (Not Admin or Creator)
  
  ![Game Details](https://github.com/muki01/Game_Store-Angular/assets/75759731/3dfe9ccd-0889-4a0b-8c2d-c3bbeb3e1b40)

* Logged in user (Admin and Creator)

![Remo,Edit Btns](https://github.com/muki01/Game_Store-Angular/assets/75759731/7ec93b97-63ea-425d-af12-07b2c467ad3c)

* If game is purchased
  
![Purchased Game](https://github.com/muki01/Game_Store-Angular/assets/75759731/a60edfd8-c693-495e-a6af-0d2174de3da8)


# Edit Page
Edit page where logged in Admin or Creator users can update Game offers

![Edit Page](https://github.com/muki01/Game_Store-Angular/assets/75759731/7e5fc282-243a-4365-8e43-33744254133c)


# 404 Not Found
404 page comes when you try to access routes that don't exist.

![404 page](https://github.com/muki01/Game_Store-Angular/assets/75759731/fb5d313c-d538-43f7-a292-43c42eef46ca)

