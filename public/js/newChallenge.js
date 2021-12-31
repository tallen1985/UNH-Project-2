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
