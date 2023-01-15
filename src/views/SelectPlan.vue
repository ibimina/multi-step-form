<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import GoBack from "../components/GoBack.vue";
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
  checked: false,
});

const selectPlan = ref([
  {
    name: "Arcade",
    amount: 9,
    bonus: "2 months free",
    img: "./images/icon-arcade.svg",
    checked: false,
  },
  {
    name: "Advance",
    amount: 12,
    bonus: "2 months free",
    img: "./images/icon-advanced.svg",
    checked: false,
  },
  {
    name: "Pro",
    amount: 15,
    bonus: "2 months free",
    img: "./images/icon-pro.svg",
    checked: false,
  },
]);
const storage = JSON.parse(localStorage.getItem("plan"));

if (storage) {
  console.log(storage);
  plan.value = storage;
  selectPlan.value = selectPlan.value.map((plan) => {
    if (plan.name === storage.name && storage.type) {
      return { ...plan, checked: storage.checked, amount: plan.amount * 10 };
    } else if (plan.name === storage.name && !storage.type) {
      return { ...plan, checked: storage.checked };
    } else if (storage.type === true) {
      return { ...plan, amount: plan.amount * 10 };
    } else {
      return plan;
    }
  });
}

const handlePlan = (e, selectedPlan) => {
  if (e.target.checked && e.target.name === "sub") {
    selectPlan.value = selectPlan.value.map((plan) => {
      const updatedPlan = {
        ...plan,
        amount: plan.amount * 10,
      };
      return updatedPlan;
    });
    plan.value = {
      ...plan.value,
      type: e.target.checked,
      amount: plan.value.amount * 10,
    };
  } else if (!e.target.checked && e.target.name === "sub") {
    selectPlan.value = selectPlan.value.map((plan) => {
      const updatedPlan = { ...plan, amount: plan.amount / 10 };
      return updatedPlan;
    });
    plan.value = {
      ...plan.value,
      type: e.target.checked,
      amount: plan.value.amount / 10,
    };
  } else if (selectedPlan) {
    plan.value = {
      ...plan.value,
      name: selectedPlan.name,
      amount: selectedPlan.amount,
      checked: e.target.checked,
    };
    selectPlan.value = selectPlan.value.map((plan) => {
      return selectedPlan.name === plan.name
        ? { ...plan, checked: e.target.checked }
        : { ...plan, checked: false };
    });
  }
};
//link to the next form page when a plan is selected
//save selected plan
const handleNextStep = () => {
  if (plan.value) {
    localStorage.setItem("plan", JSON.stringify(plan.value));
    route.push("/add-ons");
  }
};
</script>

<template>
  <SelectButton />
  <RegForm>
    <template v-slot:header>
      <h3 class="title">Select your plan</h3>
      <p class="subtitle">You have the option of monthly or yearly billing</p>
    </template>
    <template v-slot:body>
      <div>
        <label v-for="select in selectPlan" :key="select.name">
          <img :src="select.img" :alt="select.name" />
          <div>
            <span>{{ select.name }}</span>
            <span v-show="!plan.type">${{ select.amount }}/mo</span>
            <span v-show="plan.type">${{ select.amount }}/yr</span>
            <span v-show="plan.type">${{ select.bonus }}</span>
          </div>
          <input
            type="radio"
            name="plan"
            :id="select.name"
            @change="handlePlan($event, select)"
            :checked="select.checked"
          />
        </label>
        <div>
          <span>Monthly</span>
          <label>
            <span></span>
            <input
              type="checkbox"
              name="sub"
              id=""
              @change="handlePlan($event)"
              :checked="plan.type"
          /></label>
          <span>Yearly</span>
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <GoBack />
      <button @click="handleNextStep">Next Step</button>
    </template>
  </RegForm>
</template>
