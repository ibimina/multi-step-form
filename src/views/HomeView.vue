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

const getPersonalInfo = () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phonenumber").value;
  personalInfo.value = { name, email, phone };
};
const handleNextStep = () => {
  if (
    personalInfo.value.name &&
    personalInfo.value.email &&
    personalInfo.value.phone
  ) {
    route.push("/plan");
  }
};
</script>

<template>
  <SelectButton />

  <RegForm
    title="Personal info"
    subtitle="Please provide your name, email address, and phone number"
  >
    <div>
      <div>
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="e.g Stephen King"
          required
          :value="personalInfo.name"
          @input="getPersonalInfo"
        />
      </div>
      <div>
        <label for="email">Email Address</label>
        <input
          type="text"
          id="email"
          placeholder="stepehenking@lorem.com"
          required
          @input="getPersonalInfo"
        />
      </div>
      <div>
        <label for="phonenumber">Phone Number</label>
        <input
          type="tel"
          id="phonenumber"
          placeholder="e.g. +1 234 567 890"
          required
          @input="getPersonalInfo"
        />
      </div>
    </div>
    <div>
      <button @click="handleNextStep">Next Step</button>
    </div>
  </RegForm>
</template>
