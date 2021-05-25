<template>
    <form class="form" @submit.prevent="submit">
        <h1>Введите данные клиента</h1>
<!--        Фамилия-->
        <div class="form-group" :class="{ 'form-group--error': $v.lastName.$error }">
            <label class="form__label">Фамилия*</label>
            <input class="form__input" v-model.trim="$v.lastName.$model" placeholder="Иванов"/>
        </div>
        <div class="error" v-if="!$v.lastName.required">*Обязательное поле для заполнения</div>
        <div class="error" v-if="!$v.lastName.minLength">Минимум символов: {{$v.lastName.$params.minLength.min}}.</div>
        <div class="error" v-if="!$v.lastName.maxLength">Максимум символов: {{$v.lastName.$params.maxLength.max}}.</div>
<!--        Имя-->
        <div class="form-group" :class="{ 'form-group--error': $v.firstName.$error }">
            <label class="form__label">Имя*</label>
            <input class="form__input" v-model.trim="$v.firstName.$model" placeholder="Иван"/>
        </div>
        <div class="error" v-if="!$v.firstName.required">*Обязательное поле для заполнения</div>
        <div class="error" v-if="!$v.firstName.minLength">Минимум символов: {{$v.firstName.$params.minLength.min}}.</div>
        <div class="error" v-if="!$v.firstName.maxLength">Максимум символов: {{$v.firstName.$params.maxLength.max}}.</div>
<!--        Отчество-->
        <div class="form-group" :class="{ 'form-group--error': $v.middleName.$error }">
            <label class="form__label">Отчество</label>
            <input class="form__input" v-model.trim="$v.middleName.$model" placeholder="Иванович"/>
        </div>
        <div class="error" v-if="!$v.middleName.middleNameVal">Поле не может содержать цифры, спецсимволы и латиницу.</div>
        <div class="error" v-if="!$v.middleName.minLength">Минимум символов: {{$v.middleName.$params.minLength.min}}.</div>
        <div class="error" v-if="!$v.middleName.maxLength">Максимум символов: {{$v.middleName.$params.maxLength.max}}.</div>
<!--        День рождения-->
        <div class="form-group" :class="{ 'form-group--error': $v.birthday.$error }">
            <label class="form__label">День рождения*</label>
            <input class="form__input" type="date" v-model.trim="$v.birthday.$model"/>
        </div>
        <div class="error" v-if="!$v.birthday.required">*Обязательное поле для заполнения</div>
        <div class="error" v-if="!$v.birthday.maxValue">Дата не может быть больше {{ timeNow }}.</div>
        <div class="error" v-if="!$v.birthday.minValue">Дата не может быть меньше {{ timeOld }}.</div>
<!--        Номер телефона-->
        <div class="form-group" :class="{ 'form-group--error': $v.phoneNumber.$error }">
            <label class="form__label">Номер телефона*</label>
            <input class="form__input" v-model.trim="$v.phoneNumber.$model" placeholder="+7-999-123-22-22"/>
        </div>
        <div class="error" v-if="!$v.phoneNumber.required">*Обязательное поле для заполнения</div>
        <div class="error" v-if="!$v.phoneNumber.re">Номер состоит из 11 цифр и начинается с 7.</div>
<!--        Пол-->
        <div class="form-group" :class="{ 'form-group--error': $v.sex.$error }">
            <label class="form__label">Пол</label>
            <input class="form__input" v-model.trim="$v.sex.$model" placeholder='Напишите: "муж" или "жен"'/>
        </div>
        <div class="error" v-if="!$v.sex.sexVal">Напишите "муж" или "жен".</div>
<!--        Группа клиентов-->
        <div class="form-group" :class="{ 'form-group--error': $v.clientGroup.$error }">
            <label class="form__label">Группа клиентов*</label>
                <multiselect v-model.trim="$v.clientGroup.$model" :options="clientGroup_array" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" label="name" track-by="name" :preselect-first="false" placeholder="Выберите группу клиента">
                    <template slot="selection" slot-scope="{ values, search, isOpen }">
                        <span class="multiselect__single" v-if="values.length && !isOpen">Выбрано групп: {{ values.length }}</span>
                    </template>
                </multiselect>
        </div>
        <div class="error" v-if="!$v.clientGroup.required">*Обязательное поле</div>
        <div class="error" v-if="!$v.clientGroup.selectionM">Выберите одну или более групп клиентов.</div>
<!--        Лечащий врач-->
        <div class="form-group">
            <label class="form__label">Лечащий врач</label>
            <multiselect v-model="doctor" :options="doctor_array" :multiple="false" :close-on-select="false" :clear-on-select="false" :preserve-search="true" label="name" track-by="name" :preselect-first="false" placeholder="Выберите доктора">
            </multiselect>
        </div>
<!--        SMS-->
        <div class="form-group">
            <label class="form__label">
                Не отправлять СМС <input type="checkbox" v-bind:value="true" v-model="sms">
            </label>
        </div>

        <h2>Адрес</h2>
<!--        Индекс-->
        <div class="form-group" :class="{ 'form-group--error': $v.indexAdr.$error }">
            <label class="form__label">Индекс</label>
            <input class="form__input"  v-model.trim="$v.indexAdr.$model" placeholder="123456"/>
        </div>
        <div class="error" v-if="!$v.indexAdr.indexVal">Индекс должен состоять из 6 цифр.</div>
<!--        Страна-->
        <div class="form-group" :class="{ 'form-group--error': $v.countryAdr.$error }">
            <label class="form__label">Страна</label>
            <input class="form__input" v-model.trim="$v.countryAdr.$model" placeholder="Беларусь"/>
        </div>
        <div class="error" v-if="!$v.countryAdr.countryVal">Поле не может содержать цифры, спецсимволы и латиницу.</div>
        <div class="error" v-if="!$v.countryAdr.minLength">Минимум символов: {{$v.countryAdr.$params.minLength.min}}.</div>
        <div class="error" v-if="!$v.countryAdr.maxLength">Максимум символов: {{$v.countryAdr.$params.maxLength.max}}.</div>
<!--        Область-->
        <div class="form-group" :class="{ 'form-group--error': $v.regionAdr.$error }">
            <label class="form__label">Область</label>
            <input class="form__input" v-model.trim="$v.regionAdr.$model" placeholder="Минская"/>
        </div>
        <div class="error" v-if="!$v.regionAdr.regionVal">Поле не может содержать цифры, спецсимволы и латиницу.</div>
        <div class="error" v-if="!$v.regionAdr.minLength">Минимум символов: {{$v.regionAdr.$params.minLength.min}}.</div>
        <div class="error" v-if="!$v.regionAdr.maxLength">Максимум символов: {{$v.regionAdr.$params.maxLength.max}}.</div>
<!--        Город-->
        <div class="form-group" :class="{ 'form-group--error': $v.cityAdr.$error }">
            <label class="form__label">Город*</label>
            <input class="form__input" v-model.trim="$v.cityAdr.$model" placeholder="Минск"/>
        </div>
        <div class="error" v-if="!$v.cityAdr.required">*Обязательное поле</div>
        <div class="error" v-if="!$v.cityAdr.cityVal">Поле не может содержать цифры, спецсимволы и латиницу.</div>
        <div class="error" v-if="!$v.cityAdr.minLength">Минимум символов: {{$v.cityAdr.$params.minLength.min}}.</div>
        <div class="error" v-if="!$v.cityAdr.maxLength">Максимум символов: {{$v.cityAdr.$params.maxLength.max}}.</div>
<!--        Улица-->
        <div class="form-group" :class="{ 'form-group--error': $v.streetAdr.$error }">
            <label class="form__label">Улица</label>
            <input class="form__input" v-model.trim="$v.streetAdr.$model" placeholder="Строителей"/>
        </div>
        <div class="error" v-if="!$v.streetAdr.streetVal">Поле не может содержать цифры, спецсимволы и латиницу.</div>
        <div class="error" v-if="!$v.streetAdr.minLength">Минимум символов: {{$v.streetAdr.$params.minLength.min}}.</div>
        <div class="error" v-if="!$v.streetAdr.maxLength">Максимум символов: {{$v.streetAdr.$params.maxLength.max}}.</div>
<!--        № Дома-->
        <div class="form-group" :class="{ 'form-group--error': $v.houseAdr.$error }">
            <label class="form__label">№ дома</label>
            <input class="form__input" v-model.trim="$v.houseAdr.$model" placeholder="33, 55А, 77/1"/>
        </div>
        <div class="error" v-if="!$v.houseAdr.houseVal">Введите № дома правильно</div>
<!--        Тип документа-->
        <h2>Документ</h2>
        <div class="form-group" :class="{ 'form-group--error': $v.docum.$error }">
            <label class="form__label">Тип документа*</label>
            <multiselect v-model.trim="$v.docum.$model" :options="docum_array" :multiple="false" :close-on-select="false" :clear-on-select="false" :preserve-search="true" label="name" track-by="name" :preselect-first="false" placeholder="Выберите тип документа">
            </multiselect>
        </div>
        <div class="error" v-if="!$v.docum.required">*Обязательное поле</div>
<!--        Серия-->
        <div class="form-group" :class="{ 'form-group--error': $v.documSeria.$error }">
            <label class="form__label">Серия</label>
            <input class="form__input" v-model.trim="$v.documSeria.$model" placeholder="1234 или AB"/>
        </div>
        <div class="error" v-if="!$v.documSeria.documSeriaVal">Пример: "1234" или "AB"(буквы латинские).</div>
<!--        Номер-->
        <div class="form-group" :class="{ 'form-group--error': $v.documNum.$error }">
            <label class="form__label">Номер</label>
            <input class="form__input" v-model.trim="$v.documNum.$model" placeholder="123456"/>
        </div>
        <div class="error" v-if="!$v.documNum.documNumVal">Номер должен состоять из 6 цифр.</div>
<!--        Кем выдан-->
        <div class="form-group" :class="{ 'form-group--error': $v.documPlace.$error }">
            <label class="form__label">Кем выдан</label>
            <input class="form__input" v-model.trim="$v.documPlace.$model" placeholder="Минским РОВД"/>
        </div>
        <div class="error" v-if="!$v.documPlace.documPlaceVal">Поле не может содержать цифры, спецсимволы и латиницу.</div>
        <div class="error" v-if="!$v.documPlace.minLength">Минимум символов: {{$v.documPlace.$params.minLength.min}}.</div>
        <div class="error" v-if="!$v.documPlace.maxLength">Максимум символов: {{$v.documPlace.$params.maxLength.max}}.</div>
<!--        Дата выдачи-->
        <div class="form-group" :class="{ 'form-group--error': $v.documDate.$error }">
            <label class="form__label">Дата выдачи*</label>
            <input class="form__input" type="date" v-model.trim="$v.documDate.$model"/>
        </div>
        <div class="error" v-if="!$v.documDate.required">*Обязательное поле для заполнения</div>
        <div class="error" v-if="!$v.documDate.maxValueDocum">Дата не может быть больше {{ documDateTimeNow }}.</div>
        <div class="error" v-if="!$v.documDate.minValueDocum">Дата не может быть меньше {{ documDateTimeOld }}.</div>
<!--        Submit-->
        <p class="require">*Поле обязательное для заполнения.</p>
        <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Создать!</button>
        <p class="typo__p" v-if="submitStatus === 'OK'">Клиент успешно создан!</p>
        <p class="typo__p typo__p__error" v-if="submitStatus === 'ERROR'">Пожалуйста, заполните форму правильно.</p>
        <p class="typo__p typo__p__pending" v-if="submitStatus === 'PENDING'">Отправка...</p>
    </form>

</template>

<script>
    import { required, minLength, maxLength } from 'vuelidate/lib/validators'
    // форматирует переданную дату-время в формате гггг-мм-дд
    function formatDateTime1(dt) {
        let year=dt.getFullYear();
        let month=dt.getMonth()+1;
        let day=dt.getDate();
        return year + '-' + str0l(month,2) + '-' + str0l(day,2);
    }
    // форматирует переданную дату-время в формате гггг-мм-дд - 100лет
    function formatDateTimeOld1(dt) {
        let year=dt.getFullYear() - 100;
        let month=dt.getMonth()+1;
        let day=dt.getDate();
        return year + '-' + str0l(month,2) + '-' + str0l(day,2);
    }
    // форматирует переданную дату-время в формате гггг-мм-дд - 10лет
    function formatDateTimeOldDocum1(dt) {
        let year=dt.getFullYear() - 10;
        let month=dt.getMonth()+1;
        let day=dt.getDate();
        return year + '-' + str0l(month,2) + '-' + str0l(day,2);
    }

    // форматирует переданную дату-время в формате дд.мм.гггг
    function formatDateTime2(dt) {
        let year=dt.getFullYear();
        let month=dt.getMonth()+1;
        let day=dt.getDate();
        return str0l(day,2) + '.' + str0l(month,2) + '.' + year;
    }
    // форматирует переданную дату-время в формате дд.мм.гггг - 100лет
    function formatDateTimeOld2(dt) {
        let year=dt.getFullYear() - 100;
        let month=dt.getMonth()+1;
        let day=dt.getDate();
        return str0l(day,2) + '.' + str0l(month,2) + '.' + year;
    }
    // форматирует переданную дату-время в формате дд.мм.гггг - 10лет
    function formatDateTimeOldDocum2(dt) {
        let year=dt.getFullYear() - 10;
        let month=dt.getMonth()+1;
        let day=dt.getDate();
        return str0l(day,2) + '.' + str0l(month,2) + '.' + year;
    }

    // дополняет строку Val слева нулями до длины Len
    function str0l(val,len) {
        let strVal=val.toString();
        while ( strVal.length < len )
            strVal='0'+strVal;
        return strVal;
    }
    const currTime=new Date();
    console.log( formatDateTimeOldDocum1(new Date(Date.now())) + ' ДАТА СЕЙЧАС');
    console.log( formatDateTime1(currTime) );
    console.log('date ' + typeof (Number(formatDateTime1(currTime))))


    export default {
        data() {
            return {
                lastName: '',
                firstName: '',
                middleName: '',
                birthday: '',
                timeNow: formatDateTime2(currTime),
                timeOld: formatDateTimeOld2(currTime),
                phoneNumber: '',
                sex: '',
                clientGroup: [],
                clientGroup_array: [
                    {name: 'VIP'},
                    {name: 'Проблемные'},
                    {name: 'ОМС'}
                    ],
                doctor: '',
                doctor_array: [
                    {name: 'Иванов'},
                    {name: 'Захаров'},
                    {name: 'Чернышева'}
                ],
                sms: false,
                indexAdr: '',
                countryAdr: '',
                regionAdr: '',
                cityAdr: '',
                streetAdr: '',
                houseAdr: '',
                docum: '',
                docum_array: [
                    {name: 'Паспорт'},
                    {name: 'Свидетельство о рождении'},
                    {name: 'Вод. удостоверение'}
                ],
                documSeria: '',
                documNum: '',
                documPlace: '',
                documDate: '',
                documDateTimeNow: formatDateTime2(currTime),
                documDateTimeOld: formatDateTimeOldDocum2(currTime),
                age: 0,
                submitStatus: null
            }
        },
        validations: {
            lastName: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(30)
            },
            firstName: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(30)
            },
            middleName: {
                minLength: minLength(2),
                maxLength: maxLength(30),
                middleNameVal: value => (/^[А-Яа-яЁё\s]+$/).test(value) || value == ''
            },
            birthday: {
                required,
                maxValue: value => value <= formatDateTime1(new Date(Date.now())),
                minValue: value => value >= formatDateTimeOld1(new Date(Date.now()))
                // date_format: 'dd.MM.yyyy'
            },
            phoneNumber: {
                required,
                // eslint-disable-next-line no-useless-escape
                // re: value => (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/).test(value)
                // eslint-disable-next-line no-useless-escape
                re: value => (/^\+?[7][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/).test(value)
            },
            sex: {
                sexVal: value => (/^муж$/).test(value) || (/^жен$/).test(value) || value == ''
            },
            clientGroup: {
                required,
                selectionM: value => value.length >= 1
            },
            indexAdr: {
                indexVal: value => (/^\d{6}$/).test(value) || value == ''
            },
            countryAdr: {
                minLength: minLength(2),
                maxLength: maxLength(30),
                countryVal: value => (/^[А-Яа-яЁё\s]+$/).test(value) || value == ''
            },
            regionAdr: {
                minLength: minLength(2),
                maxLength: maxLength(30),
                regionVal: value => (/^[А-Яа-яЁё\s]+$/).test(value) || value == ''
            },
            cityAdr: {
                required,
                minLength: minLength(2),
                maxLength: maxLength(30),
                cityVal: value => (/^[А-Яа-яЁё\s]+$/).test(value) || value == ''
            },
            streetAdr: {
                minLength: minLength(2),
                maxLength: maxLength(30),
                streetVal: value => (/^[А-Яа-яЁё\s]+$/).test(value) || value == ''
            },
            houseAdr: {
                houseVal: value => (/^\d{1,4}([А-Яа-яЁё])?(\/\d{1,2})?$/).test(value) || value == ''
            },
            docum: {
                required
            },
            documSeria: {
                documSeriaVal: value => (/^\d{4,4}$|^[A-Z]{2}$/).test(value) || value == ''
            },
            documNum: {
                documNumVal: value => (/^\d{6}$/).test(value) || value == ''
            },
            documPlace: {
                minLength: minLength(2),
                maxLength: maxLength(30),
                documPlaceVal: value => (/^[А-Яа-яЁё\s]+$/).test(value) || value == ''
            },
            documDate: {
                required,
                maxValueDocum: value => value <= formatDateTime1(new Date(Date.now())),
                minValueDocum: value => value >= formatDateTimeOldDocum1(new Date(Date.now()))
            }
        },
        methods: {
            submit() {
                console.log('submit!')
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    // do your submit logic here
                    this.submitStatus = 'PENDING'
                    setTimeout(() => {
                        this.submitStatus = 'OK'
                    }, 500)
                }
            }

        }
    }
</script>

<style scoped lang="sass">

    .form__label
        font-family: Calibri, sans-serif !important
        font-size: 18px !important
    h1, h2
        font-family: Calibri, sans-serif
        margin-bottom: 15px
    h1
        font-size: 26px
    h2
        font-family: Calibri, sans-serif
        font-size: 22px
    .require
        font-family: Calibri, sans-serif
        font-size: 14px
    .form
        margin: 20px auto
        width: 40%
    .typo__p
        margin-top: 0
        margin-bottom: 1rem
        line-height: 1.8
        font-family: "Lato", sans-serif
        font-weight: 300
        font-size: 1rem
    .typo__p__error
        color: #f04124
    .typo__p__pending
        color: #3a4ed5
    @media only screen and (min-width: 640px)
        .typo__p
            font-size: 1.125rem

    @media only screen and (min-width: 1024px)
        .typo__p
            font-size: 1.125rem

    .button
        font-family: "Lato", sans-serif
        font-size: 0.875rem
        font-weight: 300
        color: #fff
        min-height: 2.5rem
        line-height: 1.4
        padding: 0.5rem 1.875rem 0.625rem
        box-sizing: border-box
        position: relative
        display: inline-block
        background: #41B883
        border: none
        border-radius: 5px
        z-index: 1
        overflow: hidden
        outline: none
        vertical-align: middle
        transition: 0.1s background ease, 0.1s border-color ease, 0.1s color ease
        /*border-bottom: 3px solid #266d4d*/
        box-shadow: 3px 3px 5px #266d4d
        text-decoration: none

    .button:hover, .button:focus
        background: #349268
        cursor: pointer

    .button:active
        background: #266d4d

    .button:focus
        outline: none

    .button--small
        padding: 0.375rem 1.25rem 0.375rem
        font-size: 0.75rem
        min-height: 1.875rem

    .button--xlarge
        padding: 0.875rem 3.125rem 0.9375rem
        font-size: 1.125rem
        min-height: 3.75rem

    .button--large
        padding: 0.6875rem 2.5rem 0.8125rem
        font-size: 1rem
        min-height: 3.125rem

    .button--fake
        background: none
        color: #374853
        border-color: transparent

    .button--fake:hover, .button--fake:focus
        background: rgba(0, 0, 0, 0.05)

    .button--hollow
        background: none
        color: #374853
        border: 1px solid #a8a8a8

    .button--hollow:hover, .button--hollow:focus
        background: rgba(0, 0, 0, 0.05)
        color: black
        border: 1px solid #1c1c1c
        cursor: pointer

    .button--expanded
        width: 100%

    .button--secondary
        background: #374853
        border-bottom: 3px solid #0e1316

    .button--secondary:hover, .button--secondary:focus
        background: #232d34
        cursor: pointer

    .button--success
        background: #43AC6A
        border-bottom: 3px solid #26633d

    .button--success:hover, .button--success:focus
        background: #358753
        cursor: pointer

    .button--error
        background: #f08a24
        border-bottom: 3px solid #a3570b

    .button--error:hover, .button--error:focus
        background: #d3710e
        cursor: pointer

    .button--info
        background: #5fadd6
        border-bottom: 3px solid #2a7ba5

    .button--info:hover, .button--info:focus
        background: #3698cc
        cursor: pointer

    .button__group
        margin-bottom: 20px
        width: 100%

    .button__group .button
        display: inline-block
        margin-right: 0
        margin-bottom: 0
        border-radius: 0

    .button__group .button:first-child
        border-top-left-radius: 5px
        border-bottom-left-radius: 5px

    .button__group .button:last-child
        border-top-right-radius: 5px
        border-bottom-right-radius: 5px

    .button__group--1 .button
        width: 100%

    .button__group--2 .button
        width: 50%

    .button__group--3 .button
        width: 33.33333%

    .form__input,
    .form__textarea
        position: relative
        /*margin-bottom: 2rem*/

    .form__input,
    .form__textarea
        font-family: "Lato", sans-serif
        font-size: 0.875rem
        font-weight: 300
        color: #374853
        line-height: 2.375rem
        min-height: 2.375rem
        position: relative
        border: 1px solid #E8E8E8
        border-radius: 5px
        background: #fff
        padding: 0 0.8125rem
        width: 100%
        transition: border .1s ease
        box-sizing: border-box
        .form__input:hover,
        .form__textarea:hover
            border-color: #cfcfcf
        .form__input:focus,
        .form__textarea:focus
            border-color: #a8a8a8
            outline: none
        .form__input--with-left-icon,
        .form__textarea--with-left-icon
            padding-left: 2.8125rem
        .form__input--with-right-icon,
        .form__textarea--with-right-icon
            padding-right: 2.8125rem

    .form__icon
        position: absolute
        pointer-events: none
        top: -1px
        height: 2.5rem
        line-height: 2.5rem
        .form__icon--right
            right: 0.9375rem
        .form__icon--left
            left: 0.8125rem

    .form__textarea
        max-width: 100%
        min-height: 5.125rem
        resize: none
        line-height: 1.4
        padding-top: 10px

    .form__label, .form__label--inline
        font-size: 0.8125rem
        color: #4b6372
        margin-bottom: 0.3125rem
        margin-left: 0.875rem
        display: block
        font-family: "Lato", sans-serif

    .form__label--inline
        display: inline-block
        margin-right: 1.25rem
        margin-left: 0.5rem

    .form-group
        margin-bottom: 2rem
        margin-top: -10px
        .form-group .form__input,
        .form-group .form__textarea
            margin-bottom: 0

    .form-group--merged
        font-size: 0
        display: table
        width: 100%
        border-collapse: separate
        .form-group--merged .form__label, .form-group--merged .form__label--inline
            display: table-caption

    .form-group__input,
    .form-group__addon,
    .form-group__button
        display: table-cell
        vertical-align: middle
        margin: 0
        white-space: nowrap

    .form-group__addon:first-child,
    .form-group__input:first-child,
    .form-group__button:first-child .button
        border-top-right-radius: 0
        border-bottom-right-radius: 0
        margin-right: -1px

    .form-group__addon:last-child,
    .form-group__input:last-child,
    .form-group__button:last-child .button
        border-top-left-radius: 0
        border-bottom-left-radius: 0
        margin-left: -1px

    .form-group__input:not(:first-child):not(:last-child),
    .form-group__addon:not(:first-child):not(:last-child),
    .form-group__button:not(:first-child):not(:last-child) .button
        border-radius: 0

    .form-group__button:not(:first-child):not(:last-child) .button
        margin-left: -1px
        margin-right: -1px

    .form-group__addon:first-child
        border-right: none

    .form-group__addon:last-child
        border-left: none

    .form-group__addon
        background: #F3F3F3
        border: 1px solid #E8E8E8
        border-radius: 5px
        height: 2.375rem
        line-height: 2.375rem
        width: 1%
        padding: 0 13px
        font-size: 14px
        text-align: center

    .form-group__button
        width: 1%
        .form-group__button .button
            margin: 0
            padding-right: 1.25rem
            padding-left: 1.25rem

    .form-group__message, .error
        font-size: 0.75rem
        line-height: 1
        display: none
        margin-left: 14px
        margin-top: -1.6875rem
        margin-bottom: 0.9375rem

    .form-group--alert,
    .form-group--error
        animation-name: shakeError
        animation-fill-mode: forwards
        animation-duration: .6s
        animation-timing-function: ease-in-out

    .form-group--loading .form__input
        border-image-slice: 1
        animation: loading-frame 1s infinite

    $color1: #3acfd5
    $color2: #3a4ed5
    @keyframes loading-frame
        0%
            border-color: $color1

        50%
            border-color: $color2

        100%
            border-color: $color1

    .form-group--success .form__label, .form-group--success .form__label--inline
        color: #43AC6A

    .form-group--success .form-group__addon
        color: white
        border-color: #85d0a1
        background: #85d0a1

    .form-group--success input,
    .form-group--success textarea,
    .form-group--success input:focus,
    .form-group--success input:hover
        border-color: #85d0a1

    .form-group--success + .form-group__message, .form-group--success + .error
        display: block
        color: #73c893

    .form-group--error .form__label, .form-group--error .form__label--inline
        color: #f04124

    .form-group--error .form-group__addon
        color: white
        border-color: #f79483
        background: #f79483

    .form-group--error input,
    .form-group--error textarea,
    .form-group--error input:focus,
    .form-group--error input:hover
        border-color: #f79483

    .form-group--error + .form-group__message, .form-group--error + .error
        display: block
        color: #f57f6c

    .form-group--alert .form__label, .form-group--alert .form__label--inline
        color: #f08a24

    .form-group--alert .form-group__addon
        color: white
        border-color: #f7bd83
        background: #f7bd83

    .form-group--alert input,
    .form-group--alert textarea,
    .form-group--alert input:focus,
    .form-group--alert input:hover
        border-color: #f7bd83

    .form-group--alert + .form-group__message
        display: block
        color: #f5b06c

    @keyframes shakeError
        0%
            transform: translateX(0)

        15%
            transform: translateX(0.375rem)

        30%
            transform: translateX(-0.375rem)

        45%
            transform: translateX(0.375rem)

        60%
            transform: translateX(-0.375rem)

        75%
            transform: translateX(0.375rem)

        90%
            transform: translateX(-0.375rem)

        100%
            transform: translateX(0)

    input::placeholder
        color: rgba(119, 128, 128, 0.5)

</style>
