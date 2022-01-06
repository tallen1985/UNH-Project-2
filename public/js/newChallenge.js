
const challengeName = document.getElementById('challengeName');
const categoryInput = document.getElementById('categoryInput');
const postChallenge = document.getElementById('postChallenge');
const challegeScore = document.getElementById('challengeScore');

postChallenge.addEventListener('click', async (e) => {
  const category = categoryInput.options[categoryInput.selectedIndex].value;

  if (category === '') {
    alert('Please Select a Category');
    return;
  }
  if (challengeScore.value > 20 || challengeScore.value <= 0) {
    alert('Please enter a valid Point Value (between 1 and 20)');
    return;
  }

  const sendChallenge = await fetch(`/api/challenge/`, {
    method: 'POST',
    body: JSON.stringify({
      name: challengeName.value.trim(),
      category: category,
      score: challengeScore.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (sendChallenge.ok) {
    document.location.replace('/');
  } else {
    alert('Internal Server Error');
  }
});

const acceptChallengeHandler = async (event) => {
  event.preventDefault();
  const challengeId = event.currentTarget.dataset.id

  const acceptChallenge = await fetch(`/api/accepted/`, {
    method: 'POST',
    body: JSON.stringify({
      challenge_id: challengeId,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (acceptChallenge.ok) {
    document.location.replace('/');
  } else {
    alert('Internal Server Error');
  }
}

let accepted = document.querySelectorAll('#accept-challenge');
accepted.forEach(function(item){
    item.addEventListener('click', acceptChallengeHandler)
});

const completeChallengeHandler = async (event) => {
  event.preventDefault();
  const acceptedId = event.currentTarget.dataset.acceptedid
  const score = event.currentTarget.dataset.score

  const acceptChallenge = await fetch(`/api/accepted/completed`, {
    method: 'PUT',
    body: JSON.stringify({
      accepted_id: acceptedId
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const scoreAdd = await fetch(`/api/user/addScore`, {
    method: 'PUT',
    body: JSON.stringify({
      score: score
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (acceptChallenge.ok && scoreAdd.ok) {
    document.location.replace('/');
  } else {
    alert('Internal Server Error');
  }
}

let completed = document.querySelectorAll('#complete-challenge');
completed.forEach(function(item){
    item.addEventListener('click', completeChallengeHandler)
});