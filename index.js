const container = document.querySelector('.container');
const mainUrl = 'https://students-seytech.herokuapp.com/api/students';

(() => {
  fetch(`${mainUrl}/all`)
    .then((response) => response.json())
    .then((data) => {
      const form = document.createElement('form');
      data.forEach((student) => {
        const main = document.createElement('div');
        main.className = 'main';
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        const updateBtn = document.createElement('button');
        updateBtn.className = 'update-button';
        updateBtn.textContent = 'Update';

        updateBtn.addEventListener('click', (event) => {
          event.preventDefault();
          updateStudent(event, student._id);
        });

        deleteBtn.addEventListener('click', (event) =>
          deleteStudent(event, student._id)
        );
        deleteBtn.textContent = 'Delete';
        const fName = document.createElement('input');
        const lName = document.createElement('input');
        const email = document.createElement('input');
        const bio = document.createElement('input');
        const image = document.createElement('img');
        const grade = document.createElement('span');
        grade.className = 'grade';

        fName.value = student.firstName;
        lName.value = student.lastName;
        email.value = student.email;
        bio.value = student.bio;
        image.src = student.imageUrl;
        grade.textContent = student.grade;
        main.appendChild(fName);
        main.appendChild(lName);
        main.appendChild(email);
        main.appendChild(bio);
        main.appendChild(image);
        main.appendChild(grade);
        main.appendChild(updateBtn);
        main.appendChild(deleteBtn);
        form.appendChild(main);
      });
      container.appendChild(form);
    });
})();

// MODAL
const modalOpenBtn = document.querySelector('.modal-outer-button');
const modalCloseBtn = document.querySelector('.btn-display-topright');
const modal = document.querySelector('.modal');

modalOpenBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

modalCloseBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

const fName = document.getElementById('fname');
const lName = document.getElementById('lname');
const emailll = document.getElementById('email');
const biooo = document.getElementById('bio');
const imageurl = document.getElementById('imageurl');
const gradeee = document.getElementById('grade');
const addUserBtn = document.getElementById('adduserbtn');
const success = document.createElement('p');

// ADD USER
if (addUserBtn) {
  addUserBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const firstName = fName.value;
    const lastName = lName.value;
    const email = emailll.value;
    const bio = biooo.value;
    const imageUrl = imageurl.value;
    const grade = gradeee.value;

    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        bio,
        imageUrl,
        grade,
      }),
    };
    fetch(mainUrl, config)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.location.reload();
      })
      .catch((err) => console.log(err));
    // reload page here
  });
}

// UPDATE A STUDENT
const updateStudent = (event, studentId) => {
  event.preventDefault();
  const updatedFirstName = event.target.parentNode.childNodes[0].value;
  const updatedLastName = event.target.parentNode.childNodes[1].value;
  const updatedEmail = event.target.parentNode.childNodes[2].value;
  const updatedBio = event.target.parentNode.childNodes[3].value;

  const config = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  fetch(
    `${mainUrl}?id=${studentId}&firstName=${updatedFirstName}&lastName=${updatedLastName}&email=${updatedEmail}&bio=${updatedBio}`,
    config
  )
    .then((res) => res.json())
    .then((updatedStudent) => {
      if (updateStudent) {
        success.innerText = updatedStudent.message;
        success.style.color = 'darkgreen';
        success.style.position = 'absolute';
        success.style.top = '0';
        success.style.right = '10px';

        container.appendChild(success);
        setTimeout(() => {
          success.style.display = 'none';
          // reload page here
          document.location.reload();
        }, 2000);
      }
    })
    .catch((err) => {
      success.innerText = err.message;
      success.style.color = 'darkgreen';
      success.style.position = 'absolute';
      success.style.top = '0';
      success.style.right = '10px';
      container.appendChild(success);
      setTimeout(() => {
        success.style.display = 'none';
        // reload page here
        document.location.reload();
      }, 2000);
      console.log(err);
    });
};

// DELETE A STUDENT
const deleteStudent = (e, studentId) => {
  e.preventDefault();
  const config = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };
  fetch(`${mainUrl}?id=${studentId}`, config)
    .then((res) => res.json())
    .then((deletedStudent) => {
      if (deletedStudent) {
        success.innerText = deletedStudent.message;
        success.style.color = 'darkgreen';
        success.style.position = 'absolute';
        success.style.top = '0';
        success.style.right = '10px';

        container.appendChild(success);
        setTimeout(() => {
          success.style.display = 'none';
          // reload page here
          document.location.reload();
        }, 2000);
      }
    })
    .catch((err) => {
      success.innerText = err.message;
      success.style.color = 'darkgreen';
      success.style.position = 'absolute';
      success.style.top = '0';
      success.style.right = '10px';
      container.appendChild(success);
      setTimeout(() => {
        success.style.display = 'none';
        // reload page here
        document.location.reload();
      }, 2000);
      console.log(err);
    });
};
