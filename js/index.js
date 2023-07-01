const load10Users = async() =>{
    const res = await fetch(`https://api.github.com/users?per_page=10`);
    const data = await res.json();
    const githubUsersDiv = document.getElementById('github-users-div');
    githubUsersDiv.innerHTML = '';
    displayUsers(data, githubUsersDiv);
}

// user.login.charAt(0).toUpperCase()+ user.login.slice(1)
const displayUsers = async(users, userDiv, follower) =>{
    for(const user of users){
        // console.log(user);
        const card = document.createElement('card');
        card.classList.add('col');
        const userData = await loadUserInfo(user.login);
        console.log(userData);
        card.innerHTML = `<div class="card mb-3">
        <img src="${user.avatar_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${userData.name}</h5>
          <p class="card-text">Location: ${userData.location}</p>
          <p class="card-text">Total Followers: ${userData.followers}</p>
          <p class="card-text">Total Following: ${userData.following}</p>
          <p class="card-text">First Joined: ${userData.created_at}</p>
          <p class="card-text">Github Repository: <span class="text-decoration-underline">${user.repos_url}</span></p>
          <button type="button" class="btn btn-primary ${follower ? 'd-none': 'd-block'}"  onclick="loadFollowers('${user.login}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
   Followers
  </button>
        </div>
      </div>`;
      userDiv.appendChild(card);
    }
}

const loadFollowers = async(userName) =>{
    // console.log(userName);
    const res = await fetch(`https://api.github.com/users/${userName}/followers`);
    const data = await res.json();
    showFollowers(data, userName);
}

const loadUserInfo = async(name) =>{
    const res = await fetch(`https://api.github.com/users/${name}`);
    const data = await res.json();
    // console.log(data);
    return data;
}

const showFollowers = (data, userName) => {
    console.log(data, userName);
    const followers = data.slice(0, 2);
    const modalDiv = document.getElementById('modal-div');
    console.log(followers);
    displayUsers(followers, modalDiv, 1);
}

load10Users()