<script setup>
import { ref } from "vue";
import GoBack from "../components/GoBack.vue";
import RegForm from "../components/RegForm.vue";
import SelectButton from "../components/SelectButton.vue";
import path from "../path";
path();
const plan = JSON.parse(localStorage.getItem("plan"));
const addon = JSON.parse(localStorage.getItem("addons"));
const confirm = ref(false);
const addonTotal = addon.reduce((a, b) => a + Number(b.amount), 0);
const total = plan.amount + addonTotal;
const handleConfirm = () => {
  confirm.value = true;
};
</script>

<template>
  <SelectButton />
  <div v-if="confirm">
    <img src="/images/icon-thank-you.svg" alt="successful checkmark" />
    <h3>Thank you</h3>
    <p>Thanks for confirming your subscription!</p>
    <p>
      We hope you have fun using our platform. if you ever need support, please
      feel free to email us at support@loremgaming.com
    </p>
  </div>
  <RegForm v-else>
    <template v-slot:header>
      <h3 class="title">Finishing up</h3>
      <p class="subtitle">
        Double-check everything looks OK before confirming.
      </p>
    </template>
    <template v-slot:body
      ><div>
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
              <span>{{ add.name }}</span>
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
    </template>
    <template v-slot:footer>
      <GoBack />
      <button @click="handleConfirm">Confirm</button>
    </template>
  </RegForm>
</template>
