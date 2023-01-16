<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import GoBack from "../components/GoBack.vue";
import RegForm from "../components/RegForm.vue";
import SelectButton from "../components/SelectButton.vue";

const route = useRouter();

const addOnsValue = ref([]);
const paymentType = JSON.parse(localStorage.getItem("plan"));
const monthly = [
  {
    name: "service",
    addon: "Online service",
    desc: "Access to multiplayer games",
    amount: 1,
    checked: false,
  },
  {
    name: "storage",
    addon: "Larger storage",
    desc: "Extra 1TB of cloud save",
    amount: 2,
    checked: false,
  },
  {
    name: "theme",
    addon: "Customizable profile",
    desc: "Custom theme on your profile",
    amount: 2,
    checked: false,
  },
];
const yearly = monthly.map((adds) => {
  const updated = { ...adds, amount: adds.amount * 10 };
  return updated;
});

const addOns = ref(paymentType.type ? yearly : monthly);
const storage = JSON.parse(localStorage.getItem("addons"));
if (storage) {
  storage.forEach(
    (store) =>
      (addOns.value = addOns.value.map((on) =>
        on.addon === store.name ? { ...on, checked: store.checked } : on
      ))
  );
  addOnsValue.value = storage;
}
const getAddOns = (e, val) => {
  if (e.target.checked) {
    addOnsValue.value = [
      ...addOnsValue.value,
      { name: val.addon, amount: val.amount, checked: e.target.checked },
    ];
    addOns.value = addOns.value.map((on) =>
      on.name === val.addon ? { ...on, checked: e.target.checked } : on
    );
  } else {
    addOnsValue.value = addOnsValue.value.filter(
      (addon) => addon.name !== val.addon
    );
    addOns.value = addOns.value.map((on) =>
      on.name === val.addon ? { ...on, checked: e.target.checked } : on
    );
  }
  localStorage.setItem("addons", JSON.stringify(addOnsValue.value));
};

const handleNextStep = () => {
  // localStorage.setItem("addons", JSON.stringify(addOnsValue.value));
  route.push("/summary");
};
</script>

<template>
  <SelectButton />

  <RegForm>
    <template v-slot:header>
      <h3 class="title">Pick add-ons</h3>
      <p class="subtitle">You have the option of monthly or yearly billing</p>
      <p>Add-ons help enhance your gaming experience</p>
    </template>
    <template v-slot:body>
      <div>
        <label v-for="addon in addOns" :key="addon.name">
          <input
            type="checkbox"
            name=""
            id=""
            @change="getAddOns($event, addon)"
            :checked="addon.checked"
          />
          <div>
            <span>{{ addon.addon }}</span> <span>{{ addon.desc }}</span>
          </div>
          <p v-if="paymentType.type">+${{ addon.amount }}/yr</p>
          <p v-else>+${{ addon.amount }}/mo</p>
        </label>
      </div>
    </template>
    <template v-slot:footer>
      <GoBack />
      <button @click="handleNextStep">Next Step</button>
    </template>
  </RegForm>
</template>
