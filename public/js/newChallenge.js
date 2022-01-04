// const challengeName = document.getElementById('challengeName');
// const challegeScore = document.getElementById('challengeScore');

// postChallenge.addEventListener('click', async (e) => {
//   const category = categoryInput.options[categoryInput.selectedIndex].value;

//   if (category === '') {
//     alert('Please Select a Category');
//     return;
//   }
//   if (challengeScore.value > 20 || challengeScore.value <= 0) {
//     alert('Please enter a valid Point Value (between 1 and 20)');
//     return;
//   }

//   const sendChallenge = await fetch(`/api/challenge/`, {
//     method: 'POST',
//     body: JSON.stringify({
//       name: challengeName.value.trim(),
//       category: category,
//       score: challengeScore.value,
//     }),
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (sendChallenge.ok) {
//     document.location.replace('/');
//   } else {
//     alert('Internal Server Error');
//   }
// });
// const categoryInput = document.getElementById('categoryInput');
const postChallenge = document.getElementById('postChallenge');
Dropzone.options.myDropzone= {
  url: '/api/challenge/',
  autoProcessQueue: false,
  uploadMultiple: true,
  parallelUploads: 1,
  maxFiles: 1,
  maxFilesize: 9048576,
  acceptedFiles: 'image/*',
  addRemoveLinks: true,
  init: function() {
      dzClosure = this; // Makes sure that 'this' is understood inside the functions below.

      // for Dropzone to process the queue (instead of default form behavior):
      postChallenge.addEventListener('click', async (e) => {
          // Make sure that the form isn't actually being sent.
          e.preventDefault();
          e.stopPropagation();
          dzClosure.processQueue();
      });

      //send all the form data along with the files:
      this.on("sendingmultiple", function(data, xhr, formData) {
          formData.append("challengeName", jQuery("#challengeName").val());
          formData.append("categoryInput", jQuery("#categoryInput").val());
          formData.append("challengeScore", jQuery("#challengeScore").val());
      });
  }
}