<script setup>
import RegForm from "../components/RegForm.vue";
import SelectButton from "../components/SelectButton.vue";
import path from "../path";
path();
const plan = JSON.parse(localStorage.getItem("plan"));
const addon = JSON.parse(localStorage.getItem("addons"));

const addonTotal = addon.reduce((a, b) => a + Number(b.amount), 0);
const total = plan.amount + addonTotal;
</script>

<template>
  <SelectButton />
  <RegForm
    title="Finishing up"
    subtitle="Double check everything looks OK before confirming."
  >
    <div>
      <div>
        <div>
          <div>
            <p>{{ plan.name }} (Monthly)</p>
            <p>Change</p>
          </div>
          <p v-if="plan.type">${{ plan.amount }}/yr</p>
          <p v-else>${{ plan.amount }}/mo</p>
        </div>
        <div>
          <p v-for="add in addon" :key="add.name">
            <span>{{ add.addon }}</span>
            <span v-if="plan.type"> +${{ add.amount }}/yr</span>
            <span v-else> +${{ add.amount }}/mo</span>
          </p>
        </div>
      </div>
      <p v-if="plan.type">
        Total (per year) <span>+${{ total }}/yr</span>
      </p>
      <p v-else>
        Total (per month) <span>+${{ total }}</span
        >/mo
      </p>
    </div>
    <button>confirm</button>
  </RegForm>
</template>
