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
  localStorage.setItem("plan", JSON.stringify(plan.value));
};
//link to the next form page when a plan is selected
//save selected plan
const handleNextStep = () => {
  if (plan.value) {
    // localStorage.setItem("plan", JSON.stringify(plan.value));
    route.push("/addons");
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
        <div class="plan_flex">
          <label
            v-for="select in selectPlan"
            :key="select.name"
            class="plan"
            :class="{ bord: select.checked }"
            :for="select.name"
          >
            <img :src="select.img" :alt="select.name" />
            <div>
              <span class="text_blue">{{ select.name }}</span>
              <span v-show="!plan.type" class="text_grey"
                >${{ select.amount }}/mo</span
              >
              <span v-show="plan.type" class="text_grey"
                >${{ select.amount }}/yr</span
              >
              <span v-show="plan.type" class="text_free"
                >${{ select.bonus }}</span
              >
            </div>
            <input
              type="radio"
              name="plan"
              :id="select.name"
              @change="handlePlan($event, select)"
              :checked="select.checked"
            />
          </label>
        </div>

        <div class="paymentplan">
          <span class="month">Monthly</span>
          <label class="toggle">
            <input
              type="checkbox"
              name="sub"
              id=""
              @change="handlePlan($event)"
              :checked="plan.type"
            />
            <span class="slide"></span>
          </label>
          <span>Yearly</span>
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <aside>
        <GoBack />
        <button @click="handleNextStep" class="left">Next Step</button>
      </aside>
    </template>
  </RegForm>
</template>

<style scoped>
.plan {
  display: flex;
  align-items: flex-start;
  gap: 1em;
  padding: 1em;
  border-radius: 7px;
  border: 1px solid hsl(229, 24%, 87%);
  margin-bottom: 1em;
  box-shadow: 0px 3px 0px 0px rgba(221, 221, 221, 0.5);
  cursor: pointer;
}

.plan:hover {
  border: 1px solid hsl(243, 100%, 62%);
}

.text_blue {
  color: hsl(213, 96%, 18%);
  font-weight: 700;
  margin-bottom: 0.2em;
}

.text_grey {
  color: hsl(231, 11%, 63%);
  font-size: 14px;
  line-height: 10px;
}

.text_free {
  line-height: 12px;
  color: hsl(213, 96%, 18%);
  margin-top: 0.8em;
  font-size: 14px;
}

.plan div {
  display: flex;
  flex-direction: column;
}

input[type="radio"] {
  width: 0;
  height: 0;
}

.bord {
  border: 1px solid hsl(243, 100%, 62%);
  background-color: hsl(217, 100%, 97%);
  box-shadow: none;
}

.paymentplan {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  padding: 0.5em;
  border-radius: 5px;
  margin-top: 1.5em;
  background-color: hsl(231, 100%, 99%);
}

.month {
  color: hsl(213, 96%, 18%);
  font-weight: 700;
}

.toggle {
  width: 33px;
  height: 17px;
  border-radius: 8px;
  background-color: hsl(213, 96%, 18%);
  position: relative;
  cursor: pointer;
}

.toggle span {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  bottom: 0.2em;
  left: 0.3em;
  transition: 0.5s;
}

input[type="checkbox"] {
  width: 0;
  height: 0;
}

input[type="checkbox"]:checked + .slide {
  -webkit-transform: translateX(13px);
  transform: translateX(13px);
  -ms-transform: translateX(13px);
}

@media (min-width: 40rem) {
  .plan_flex {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1em;
  }

  .plan {
    display: flex;
    flex-direction: column;
  }
}
</style>
