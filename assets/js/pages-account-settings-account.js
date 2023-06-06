"use strict";
document.addEventListener("DOMContentLoaded", function (e) {
    {
        const o = document.querySelector("#formAccountSettings"),
            a = document.querySelector("#formAccountDeactivation"),
            i = a.querySelector(".deactivate-account"),
            s =
                (o &&
                    FormValidation.formValidation(o, {
                        fields: { firstName: { validators: { notEmpty: { message: "لطفا نام خود را وارد کنید" } } }, lastName: { validators: { notEmpty: { message: "لطفا نام خانوادگی را وارد کنید" } } } },
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger(),
                            bootstrap5: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".col-md-6" }),
                            submitButton: new FormValidation.plugins.SubmitButton(),
                            autoFocus: new FormValidation.plugins.AutoFocus(),
                        },
                        init: (e) => {
                            e.on("plugins.message.placed", function (e) {
                                e.element.parentElement.classList.contains("input-group") && e.element.parentElement.insertAdjacentElement("afterend", e.messageElement);
                            });
                        },
                    }),
                a &&
                    FormValidation.formValidation(a, {
                        fields: { accountActivation: { validators: { notEmpty: { message: "لطفا با حذف حساب کاربری خود موافقت کنید" } } } },
                        plugins: {
                            trigger: new FormValidation.plugins.Trigger(),
                            bootstrap5: new FormValidation.plugins.Bootstrap5({ eleValidClass: "" }),
                            submitButton: new FormValidation.plugins.SubmitButton(),
                            fieldStatus: new FormValidation.plugins.FieldStatus({
                                onStatusChanged: function (e) {
                                    e ? i.removeAttribute("disabled") : i.setAttribute("disabled", "disabled");
                                },
                            }),
                            autoFocus: new FormValidation.plugins.AutoFocus(),
                        },
                        init: (e) => {
                            e.on("plugins.message.placed", function (e) {
                                e.element.parentElement.classList.contains("input-group") && e.element.parentElement.insertAdjacentElement("afterend", e.messageElement);
                            });
                        },
                    }),
                document.querySelector("#accountActivation"));
        i &&
            (i.onclick = function () {
                1 == s.checked &&
                    Swal.fire({
                        text: "آیا از حذف حساب کاربری خود مطمین هستید؟",
                        icon: "warning",
                        showCancelButton: !0,
                        confirmButtonText: "بله",
                        customClass: { confirmButton: "btn btn-primary me-2", cancelButton: "btn btn-label-secondary" },
                        buttonsStyling: !1,
                    }).then(function (e) {
                        e.value
                            ? Swal.fire({ icon: "success", title: "حذف شد!", text: "حساب کاربری با موفقیت حذف شد", customClass: { confirmButton: "btn btn-success" } })
                            : e.dismiss === Swal.DismissReason.cancel && Swal.fire({ title: "لغو شد!", text: "حذف حساب کاربری لغو شد!!", icon: "error", customClass: { confirmButton: "btn btn-success" } });
                    });
            });
        var t = document.querySelector("#phoneNumber"),
            n = document.querySelector("#zipCode");
        t && new Cleave(t, { phone: !0, phoneRegionCode: "IR" }), n && new Cleave(n, { delimiter: "", numeral: !0 });
        let e = document.getElementById("uploadedAvatar");
        const l = document.querySelector(".account-file-input"),
            c = document.querySelector(".account-image-reset");
        if (e) {
            const r = e.src;
            (l.onchange = () => {
                l.files[0] && (e.src = window.URL.createObjectURL(l.files[0]));
            }),
                (c.onclick = () => {
                    (l.value = ""), (e.src = r);
                });
        }
    }
}),
    $(function () {
        var e = $(".select2");
        e.length &&
            e.each(function () {
                var e = $(this);
                e.wrap('<div class="position-relative"></div>'), e.select2({ dropdownParent: e.parent() });
            });
    });
