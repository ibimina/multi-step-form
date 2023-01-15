<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import RegForm from "../components/RegForm.vue";
import SelectButton from "../components/SelectButton.vue";

const route = useRouter();
const addOns = [
  {
    name: "service",
    addon: "Online service",
    desc: "Access to multiplayer games",
    amount: 1,
  },
  {
    name: "storage",
    addon: "Larger storage",
    desc: "Extra 1TB of cloud save",
    amount: 2,
  },
  {
    name: "theme",
    addon: "Customizable profile",
    desc: "Custom theme on your profile",
    amount: 2,
  },
];
const addOnsValue = ref([]);
const paymentType = JSON.parse(localStorage.getItem("plan"));

const getAddOns = (e, val) => {
  if (e.target.checked) {
    addOnsValue.value = [...addOnsValue.value, val];
  } else {
    addOnsValue.value = addOnsValue.value.filter(
      (addon) => addon.name !== val.name
    );
  }
};
const handleNextStep = () => {
  route.push("/summary");
};
</script>

<template>
  <SelectButton />

  <RegForm
    title="Pick add-ons"
    subtitle="Add-ons help enhance your gaming experience"
  >
    <div>
      <label v-for="addon in addOns" :key="addon.name">
        <input
          type="checkbox"
          name=""
          id=""
          @change="getAddOns($event, addon)"
        />
        <div>
          <span>{{ addon.addon }}</span> <span>{{ addon.desc }}</span>
        </div>
        <p v-if="paymentType.type">+${{ addon.amount * 10 }}/mo</p>
        <p v-else>{{ addon.amount }}</p>
      </label>
    </div>
    <button @click="handleNextStep">Next Step</button>
  </RegForm>
</template>
