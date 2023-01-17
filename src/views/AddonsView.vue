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
  } else {
    addOnsValue.value = addOnsValue.value.filter(
      (addon) => addon.name !== val.addon
    );
  }
  addOns.value = addOns.value.map((on) =>
    on.name === val.name ? { ...on, checked: e.target.checked } : on
  );
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
      <p class="subtitle">Add-ons help enhance your gaming experience</p>
    </template>
    <template v-slot:body>
      <div>
        <label
          v-for="addon in addOns"
          :key="addon.name"
          class="pick"
          :class="{ check: addon.checked }"
        >
          <div class="pick_col">
            <div class="checkbox_con">
              <input
                class="checkbox"
                type="checkbox"
                @change="getAddOns($event, addon)"
                :checked="addon.checked"
              />
              <span class="checkmark"></span>
            </div>
            <div class="pick_desc">
              <span class="add_name">{{ addon.addon }}</span>
              <span class="pic_des">{{ addon.desc }}</span>
            </div>
          </div>
          <p v-if="paymentType.type" class="amt">+${{ addon.amount }}/yr</p>
          <p v-else class="amt">+${{ addon.amount }}/mo</p>
        </label>
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

<style>
.pick {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em;
  border-radius: 7px;
  border: 1px solid hsl(229, 24%, 87%);
  margin-bottom: 1em;
  box-shadow: 0px 3px 0px 0px rgba(221, 221, 221, 0.5);
  cursor: pointer;
}
.pick:hover {
  border: 1px solid hsl(243, 100%, 62%);
  box-shadow: none;
}
.add_name {
  color: hsl(213, 96%, 18%);
  font-weight: 500;
}
.pick_col {
  display: flex;
  align-items: center;
  gap: 1em;
}
.pick_desc {
  display: flex;
  flex-direction: column;
}
.check {
  border: 1px solid hsl(243, 100%, 62%);
  background-color: hsl(217, 100%, 97%);
  box-shadow: none;
}

.pic_des {
  font-size: 14px;
  color: hsl(229, 24%, 87%);
}
.checkbox_con {
  display: block;
  position: relative;
  padding-left: 20px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox_con input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.amt {
  color: hsl(243, 100%, 62%);
  font-size: 12px;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid hsl(229, 24%, 87%);
}

/* On mouse-over, add a grey background color */
/* .container:hover input ~ .checkmark {
  background-color: #ccc;
} */

/* When the checkbox is checked, add a blue background */
.checkbox_con input:checked ~ .checkmark {
  background-color: hsl(243, 100%, 62%);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox_con input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox_con .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
