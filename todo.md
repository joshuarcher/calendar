## Calendar ToDo
- [x] Display exisiting reminders in the calendar 
  - this is related to the redux store which I am currently struggling to remember
- [ ] Ability To Add New Reminders
  - [x] Added form to new reminder modal
  - [ ] Add the form logic connecting to Redux 
    - [ ] Reminders can be max of 30 characters 
      - [!] this is via a client side check though we should also confirm this length server side 
      - [?] Is this inclusive of spaces? 
- [x] User can select a color when creating a reminder
  - [?] Is this a limited selection?
- [ ] reminder color displays correctly with calendar item   
- [ ] Reminders are displayed in correct time order 
  - [?] Does DateFNS give this information in correct order if not we can do this with a universal date time. 
- [x] Clicking on a calendar cell, opens new reminder window
  - [ ] replace the agenda modal for dates that do have reminders
- [ ] Overflow of multiple reminders should be handled to not obstruct other calendar dates
- [ ] Add checkbox for all day event
   - [ ] Should all day events be top or bottom of sorted list  
***
### Bonus Items
- [ ] Connect Reminders to backend (firebase)
- [ ] Demonstrate Something your uniquely skilled at 


***
### Questions 
- Do we have limited colors for users to select for their reminders
- Do we allow overlapping reminders/events 
- Do we want overflow calendar events to scroll or how do we want to display overflow events? 