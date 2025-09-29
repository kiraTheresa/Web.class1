// 主题代码
// 声明组件
const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password-confirm");

// 设置监听
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
  let isFormValid = isRequiredValid;
  
  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkLength(password, 6, 25);
    const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

    isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }

  if (isFormValid) {
    alert("Registration successful!");
    form.reset();
    // 重置所有表单项目的样式
    document.querySelectorAll(".form-item").forEach((item) => {
      item.className = "form-item";
      // 隐藏所有错误信息
      const small = item.querySelector("small");
      if (small) {
        small.style.visibility = "hidden";
      }
    }); 
  }
});

/*
0、检查每个输入是否有输入值；
1、用户名的长度不能过短或者过长，要在3-15个字符之间；
2、email地址要有效；
3、密码不能过短或者过长，在6-25个字符之间；
4、密码与确认密码要一致；
*/

// 检查长度
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${formatFieldName(input)} must be at least ${min} characters.`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${formatFieldName(input)} must be less than ${max} characters.`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// 规范名称
function formatFieldName(input) {
  // 处理带连字符的ID（如password-confirm）
  let fieldName = input.id.replace('-', ' ');
  return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
}

// 检查邮箱
function checkEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value.trim())) {
    showSuccess(email);
    return true;
  } else {
    showError(email, "Email is not valid");
    return false;
  }
}

// 检查密码是否匹配
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    return false;
  } else {
    showSuccess(input2);
    return true;
  }
}

// 检查空
function checkRequired(inputArray) {
  let isValid = true;

  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });
  return isValid;
}

// 显示错误与成功状态
function showError(input, message) {
  const formItem = input.parentElement;
  formItem.className = "form-item error";
  const small = formItem.querySelector("small");
  small.innerText = message;
  small.style.visibility = "visible"; 
}

function showSuccess(input) {
  const formItem = input.parentElement;
  formItem.className = "form-item success";
  const small = formItem.querySelector("small");
  small.innerText = "";
  small.style.visibility = "hidden"; 
}