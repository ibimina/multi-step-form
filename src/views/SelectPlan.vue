<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import RegForm from "../components/RegForm.vue";
import SelectButton from "../components/SelectButton.vue";
import path from "../path";
//call function to select form page
path();
// route to link to nect page
const route = useRouter();
// component reactive data using composition api ref
const plan = ref({
  name: "",
  amount: "",
  type: false,
});
const selectPlan = ref([
  {
    name: "Arcade",
    amount: 9,
    bonus: "2 months free",
    img: "./images/icon-arcade.svg",
  },
  {
    name: "Advance",
    amount: 12,
    bonus: "2 months free",
    img: "./images/icon-advanced.svg",
  },
  {
    name: "Pro",
    amount: 15,
    bonus: "2 months free",
    img: "./images/icon-pro.svg",
  },
]);
//get selected plan and check the type of payment
const handlePlan = (e, selectedPlan) => {
  if (e.target.checked && e.target.name === "sub") {
    plan.value.type = e.target.checked;
    selectPlan.value = selectPlan.value.map((plan) => {
      const updatedPlan = { ...plan, amount: plan.amount * 10 };
      return updatedPlan;
    });
  } else if (!e.target.checked && e.target.name === "sub") {
    plan.value.type = e.target.checked;
    selectPlan.value = selectPlan.value.map((plan) => {
      const updatedPlan = { ...plan, amount: plan.amount / 10 };
      return updatedPlan;
    });
  } else if (selectedPlan) {
    plan.value.name = selectedPlan.name;
    plan.value.amount = selectedPlan.amount;
  }
};
//link to the next form page when a plan is selected
//save selected plan
const handleNextStep = () => {
  if (plan.value.name && plan.value.amount) {
    localStorage.setItem("plan", JSON.stringify(plan.value));
    route.push("/add-ons");
  }
};
</script>

<template>
  <SelectButton />
  <RegForm>
    <div>
      <label v-for="select in selectPlan" :key="select.name">
        <div>
          <span>{{ select.name }}</span> <span>${{ select.amount }}/mo</span>
        </div>
        <img :src="select.img" :alt="select.name" />
        <input
          type="radio"
          name="plan"
          :id="select.name"
          @change="handlePlan($event, select)"
        />
      </label>
      <div>
        <span>Monthly</span>
        <label>
          <span></span>
          <input type="checkbox" name="sub" id="" @change="handlePlan($event)"
        /></label>
        <span>Yearly</span>
      </div>
    </div>
    <button @click="handleNextStep">Next Step</button>
  </RegForm>
</template>
