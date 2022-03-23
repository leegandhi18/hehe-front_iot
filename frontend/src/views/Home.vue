<template>
  <div>
    <div style="margin-top: 80px">
      <b-row align-h="center">
        <b-col cols="4">
          <b-card title="로그인">
            <b-form-group label-cols="4" label-cols-lg="3" label="이름" label-for="input-userid">
              <b-form-input id="input-userid" v-model="userid"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="패스워드" label-for="input-password">
              <b-form-input id="input-password" v-model="password" type="password"></b-form-input>
            </b-form-group>
            <b-form-group label-cols="4" label-cols-lg="3" label="">
              <b-button id="login" variant="dark" :disabled="loading" @click="onSubmit"
                ><b-spinner v-if="loading" small></b-spinner> 로그인</b-button
              >
            </b-form-group>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<style>
#login {
  float: right;
}
</style>
