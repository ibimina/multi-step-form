<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import RegForm from "../components/RegForm.vue";
import SelectButton from "../components/SelectButton.vue";
import path from "../path";
path();
const route = useRouter();
const plan = ref({
  name: "",
  amount: "",
  monthly: "",
  yearly: "",
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
const handleNextStep = () => {
  if (
    plan.value.name &&
    plan.value.amount &&
    plan.value.monthly &&
    plan.value.yearly
  ) {
    route.push("/plan");
  }
};
</script>

<template>
  <main>
    <SelectButton />
    <RegForm>
      <div>
        <label v-for="select in selectPlan" :key="select.name">
          <div>
            <span>{{ select.name }}</span> <span>${{ select.amount }}/mo</span>
          </div>
          <img :src="select.img" alt="" />
          <input type="radio" name="plan" :id="select.name" />
        </label>
        <div>
          <span>Monthly</span>
          <label> <span></span> <input type="radio" name="" id="" /></label>
          <span>Yearly</span>
        </div>
      </div>
      <button @click="handleNextStep">Next Step</button>
    </RegForm>
  </main>
</template>
