<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import RegForm from "../components/RegForm.vue";
import SelectButton from "../components/SelectButton.vue";

const route = useRouter();
const personalInfo = ref({
  name: "",
  email: "",
  phone: "",
});
const errorInfo = ref({
  name: false,
  email: false,
  phone: false,
});
const getPersonalInfo = () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phonenumber").value;
  personalInfo.value = { name, email, phone };
};
let storage = JSON.parse(localStorage.getItem("personalInfo"));

if (storage) {
  personalInfo.value = {
    name: storage.name,
    email: storage.email,
    phone: storage.phone,
  };
}

const handleNextStep = () => {
  if (
    personalInfo.value.name &&
    personalInfo.value.email &&
    personalInfo.value.phone
  ) {
    localStorage.setItem("personalInfo", JSON.stringify(personalInfo.value));
    route.push("/plan");
  } else {
    personalInfo.value.name === ""
      ? (errorInfo.value.name = true)
      : (errorInfo.value.name = false);
    personalInfo.value.email === ""
      ? (errorInfo.value.email = true)
      : (errorInfo.value.email = false);
    personalInfo.value.phone === ""
      ? (errorInfo.value.phone = true)
      : (errorInfo.value.phone = false);
  }
};
</script>

<template>
  <SelectButton />

  <RegForm>
    <template v-slot:header>
      <h3 class="title">Personal info</h3>
      <p class="subtitle">
        Please provide your name, email address, and phone number
      </p>
    </template>
    <template v-slot:body>
      <div>
        <div class="info_con">
          <label for="name"
            >Name
            <span v-if="errorInfo.name" class="invalid"
              >This field is required</span
            ></label
          >
          <input
            type="text"
            id="name"
            class="name"
            placeholder="e.g Stephen King"
            required
            :value="personalInfo.name"
            @input="getPersonalInfo"
            :class="{ invalid: errorInfo.name }"
          />
        </div>
        <div class="info_con">
          <label for="email"
            >Email Address<span v-if="errorInfo.email" class="invalid"
              >This field is required</span
            ></label
          >
          <input
            type="text"
            id="email"
            class="email"
            placeholder="stepehenking@lorem.com"
            required
            :value="personalInfo.email"
            @input="getPersonalInfo"
            :class="{ invalid: errorInfo.email }"
          />
        </div>
        <div class="info_con">
          <label for="phonenumber"
            >Phone Number<span v-if="errorInfo.phone" class="invalid"
              >This field is required</span
            >
          </label>
          <input
            type="tel"
            id="phonenumber"
            class="phone"
            placeholder="e.g. +1 234 567 890"
            required
            :value="personalInfo.phone"
            @input="getPersonalInfo"
            :class="{ invalid: errorInfo.phone }"
          />
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <button @click="handleNextStep" class="left">Next Step</button>
    </template>
  </RegForm>
</template>

<style scoped>
.info_con {
  margin-bottom: 0.5em;
}

.info_con label,
.info_con input {
  width: 100%;
  display: block;
  cursor: pointer;
}
.info_con input {
  padding: 1em;
  border-radius: 5px;
  border: 1px solid hsl(229, 24%, 87%);
}
.info_con label {
  margin-bottom: 0.1em;
  color: hsl(213, 96%, 18%);
  font-weight: 400;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
.info_con input:focus {
  outline: 1px solid hsl(243, 100%, 62%);
}
input.invalid {
  outline: 1px solid hsl(354, 84%, 57%);
}
span.invalid {
  color: hsl(354, 84%, 57%);
}
</style>
