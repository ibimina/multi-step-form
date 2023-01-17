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
  <RegForm v-if="confirm">
    <template v-slot:thankyou>
      <div class="thanks">
        <img
          src="/images/icon-thank-you.svg"
          alt="successful checkmark"
          class="check_icon"
        />
        <h3 class="thanks_text">Thank you</h3>
        <p class="summary_addon nomargin">
          Thanks for confirming your subscription!
        </p>
        <p class="summary_addon nomargin">
          We hope you have fun using our platform. if you ever need support,
          please feel free to email us at support@loremgaming.com
        </p>
      </div>
    </template>
  </RegForm>
  <RegForm v-else>
    <template v-slot:header>
      <h3 class="title">Finishing up</h3>
      <p class="subtitle">
        Double-check everything looks OK before confirming.
      </p>
    </template>
    <template v-slot:body>
      <div>
        <div class="summary">
          <div class="summary_flex summary_plan">
            <div>
              <p class="adds bold">{{ plan.name }} (Monthly)</p>
              <RouterLink to="/plan" class="summary_addon link"
                >Change</RouterLink
              >
            </div>
            <p v-if="plan.type" class="adds bold">${{ plan.amount }}/yr</p>
            <p v-else class="adds bold">${{ plan.amount }}/mo</p>
          </div>
          <div>
            <p
              v-for="add in addon"
              :key="add.name"
              class="summary_addon summary_flex"
            >
              <span>{{ add.name }}</span>
              <span v-if="plan.type" class="adds"> +${{ add.amount }}/yr</span>
              <span v-else class="adds"> +${{ add.amount }}/mo</span>
            </p>
          </div>
        </div>
        <p v-if="plan.type" class="total summary_flex">
          Total (per year) <span class="totalvalue">+${{ total }}/yr</span>
        </p>
        <p v-else class="total summary_flex">
          Total (per month) <span class="totalvalue">+${{ total }}/mo</span>
        </p>
      </div>
    </template>
    <template v-slot:footer>
      <aside>
        <GoBack />
        <button @click="handleConfirm" class="left blue">Confirm</button>
      </aside>
    </template>
  </RegForm>
</template>
<style>
.summary {
  background-color: hsl(231, 100%, 99%);
  padding: 1em;
  border-radius: 8px;
  margin-bottom: 1em;
}
.summary_flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.summary_plan {
  padding-bottom: 0.5em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid rgb(226, 225, 225);
}
.totalvalue {
  color: blue;
  font-weight: 700;
}
.adds {
  color: hsl(213, 96%, 18%);
  font-weight: 500;
}
.link {
  text-decoration: underline;
}
.bold {
  font-weight: 700;
}
.blue {
  background-color: blue;
}
.summary_addon {
  color: hsl(231, 11%, 63%);
  margin-bottom: 0.5em;
}
.total {
  padding: 0 1em;
  color: hsl(231, 11%, 63%);
}
.thanks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3em auto;
}
.check_icon {
  margin-bottom: 1.5em;
}
.thanks_text {
  margin-bottom: 0.5em;
}
.nomargin {
  margin-bottom: 0;
  padding: 0 0.5em;
  text-align: center;
}
.link:hover {
  color: blue;
}
.blue:hover {
  opacity: 0.5;
  cursor: pointer;
}
</style>
