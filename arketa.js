//string func -> true or false palidrome
function palidromeValidation(p) {
    let lastIndex = p.length-1;

    for (let char of p) {
      if(char != p[lastIndex]) {
        return false;
      }
      lastIndex--;
    }

    return true;
  }

  //multiple two numbers no multiplication symbole
  function multiply(numberOne, numberTwo) {
    let sum = 0;

    for (let index = 0; index < Math.abs(numberOne); index++) {
        sum += numberTwo;
    }

    if(numberOne < 0) {
        sum = parseFloat('-' + sum);
    }

    return sum;
  } 
  
//   console.log(palidromeValidation('kayyak'));
  console.log(multiply(0, -7));

/* Prime Video Arch 

Front - React & Typescript
  Displaying content and calling apis 
  Login
    -> user -> search, current content, saved items, recomended, categorized content 
        offline downloaded 
        Video player, viewer page  
    -> provider
    -> admin -> user security management, site analytics, home grown analytics, add/removing content, 
    categorizing of the content/tagging, video metadata, set yourself as user level/person, subscription metrics 
Backend - Node, Python, etc. 
  APIs 
AWS/GCP
Servers
  web and website - DB - users, meta
    User - preferences, offline downloads, favorite channels/shows
    Providers - logins, details, uploads, etc. 
  media storage - DB - video data 
*/