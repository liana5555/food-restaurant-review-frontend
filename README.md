# About the project

This is the frontend side app of my food and restaurant reviewing web app.
This is a **hypotetical website** in that sense that there aren't real users and
If you try it out and register with your own and existing personal information **there is no guarantee that it would stay safe since the database is hosted on a free site** where demos are hosted. **I don't hold any responsibility if your data gets stolen.** Since there is no verfication on the server side it is possble to write fake emails and usernames in case you want to try things out as a normal user. There is a retsurant worker typ of user which you can use by test username and the same password to log in and try the features.

The server side code for this application is in another repository.

If you want to check it out: https://food-review-server.onrender.com/
The loading might take a long time since I am hosting from free tier and there aren't a lot of visitors obviously so most of the time t is idle.

## The capabilities of the app

- There are 3 types of registered users:

  - admin
  - normal user
  - restaurant workers

- Normal users can do the following:
  - log in
  - write posts / update their posts / delete their posts
  - write comments / delete their comments
  - manage their profile: changing first name, last name etc., delete their profile, changing psw
  - chat: creating chat groups and chat (leaving the group is not done yet)
  - reserving at restaurants / cancelling previous reservation
  - report posts and comments
- Admins can do everything that normal user can plus:
  - changing any user's personal information even deleting them
  - listing the reports and deleting reports
  - deleting posts - not implemented yet
- Restaurant workers can do everything a normal user can plus:
  - writing advertisements / update / delete
  - managing reservations (accepting or cancelling them)
  - updating their restaurant information
- Not registered "users" :
  - read posts
  - read comments
  - search restaurants and read their details
