# Mobile Student Intranet Project

Message Hub System with subscription based message publishing consisting of a web portal and mobile app. Subscriptions are in an information cube hiearchy format, which is stored in a NoSQL database and managed in the web portal. Messages are relayed to subscriptions through the web portal via FCM to the mobile app. The mobile app receives messages and stores them in a local datase. The app allows indidivuals to view their messages and manage their subscriptions.

## Team
* Max Tsai
* Dawn Truelsen
* Victoria Fall

## Mobile App

### Push Notifications

![](images/push_notif.PNG)
![](images/push_notif_banner.PNG)

### Message Views

![](images/messages.png)
![](images/detail_messages.png)
![](images/channel_messages.png)

### Subscription Views

![](images/subs.png)
![](images/subs_expanded.png)
![](images/my_subs.png)

## Web Portal

### Communicator Message Publishing

![](images/send_msg.png)

### Admin Information Cube Management

![](images/menu.png)
![](images/add_area.png)
![](images/add_subject.png)
![](images/manage_areas.png)
![](images/manage_subjects.png)

## Development

### Technologies Used

* Firebase Cloud Messaging
* React Native
* NodeJS
* ExpressJS
* MongoDB

### Architecture

![](images/Architecture.png)

### Software and System Design

Information regarding the software and system design can be found in the [design documentation](documentation/System_Design_Document.pdf).
