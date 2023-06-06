"use strict";
let fv, offCanvasEl;
document.addEventListener("DOMContentLoaded", function (e) {
    var t;
    (t = document.getElementById("form-add-new-record")),
        setTimeout(() => {
            const e = document.querySelector(".create-new"),
                t = document.querySelector("#add-new-record");
            e &&
                e.addEventListener("click", function () {
                    (offCanvasEl = new bootstrap.Offcanvas(t)),
                        (t.querySelector(".dt-title_t").value = ""),
                        (t.querySelector(".dt-type_payment").value = ""),
                        (t.querySelector(".dt-date").value = ""),
                        (t.querySelector(".dt-salary").value = ""),
                        offCanvasEl.show();
                });
        }, 200),
        (fv = FormValidation.formValidation(t, {
            fields: {
                basicTitlet: { validators: { notEmpty: { message: "لطفا عنوان خرجی را وارد کنید" } } },
                basicType_payment: { validators: { notEmpty: { message: "لطفا نوع پرداختی را وارد کنید" } } },
                basicDate: { validators: { notEmpty: { message: "لطفا تاریخ پرداختی را وارد کنید" }, date: { format: "YYYY/MM/DD", message: "تاریخ وارد شده نامعتبر است" } } },
                basicSalary: { validators: { notEmpty: { message: "لطفا مبلغ پرداختی را وارد کنید" } } },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                bootstrap5: new FormValidation.plugins.Bootstrap5({ eleValidClass: "", rowSelector: ".col-sm-12" }),
                submitButton: new FormValidation.plugins.SubmitButton(),
                autoFocus: new FormValidation.plugins.AutoFocus(),
            },
            init: (e) => {
                e.on("plugins.message.placed", function (e) {
                    e.element.parentElement.classList.contains("input-group") && e.element.parentElement.insertAdjacentElement("afterend", e.messageElement);
                });
            },
        })),
        flatpickr(t.querySelector('[name="basicDate"]'), {
            enableTime: !1,
            dateFormat: "Y/m/d",
            onChange: function () {
                fv.revalidateField("basicDate");
            },
        });
}),
    $(function () {
        var l,
            t,
            e = $(".datatables-basic"),
            a = $(".dt-complex-header"),
            s = $(".dt-row-grouping"),
            n = $(".dt-multilingual"),
            r =
                (e.length &&
                    ((l = e.DataTable({
                        "ordering": false,
                        columns: [{ data: "" }, { data: "" }, { data: "" }, { data: "title_t" }, { data: "type_payment" }, { data: "start_date" }, { data: "salary" }, { data: "" }, { data: "" }],
                        columnDefs: [
                            {
                                className: "control",
                                orderable: !1,
                                searchable: !1,
                                responsivePriority: 2,
                                targets: 0,
                                render: function (e, t, a, s) {
                                    return "";
                                },
                            },
                            {
                                targets: 1,
                                orderable: !1,
                                searchable: !1,
                                responsivePriority: 3,
                                checkboxes: !0,
                                checkboxes: { selectAllRender: '<input type="checkbox" class="form-check-input">' },
                                render: function () {
                                    return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                                },
                            },
                            { targets: 2, searchable: !1, visible: !1 },
                            {
                                targets: 3,
                                responsivePriority: 4,
                                render: function (e, t, a, s) {
                                    var n = a.avatar,
                                        l = a.title_t;
                                    return (
                                        '<div class="d-flex justify-content-start align-items-center user-name"><div class="avatar-wrapper"><div class="avatar me-2">' +
                                        (n
                                            ? '<img src="' + assetsPath + "/img/avatars/" + n + '" alt="Avatar" class="rounded-circle">'
                                            : '<span class="avatar-initial rounded-circle bg-label-' +
                                              ["success", "danger", "warning", "info", "dark", "primary", "secondary"][Math.floor(6 * Math.random())] +
                                              '">' +
                                              (n = (((n = (l = a.title_t).match(/\b\w/g) || []).shift() || "") + (n.pop() || "")).toUpperCase()) +
                                              "</span>") +
                                        '</div></div><div class="d-flex flex-column"><span class="emp_name text-truncate">' +
                                        l +
                                        '</span></div>'
                                    );
                                },
                            },
                            { responsivePriority: 1, targets: 4 },

                        ],
                        order: [[2, "desc"]],
                        dom:
                            '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                        displayLength: 7,
                        lengthMenu: [7, 10, 25, 50, 75, 100],
                        buttons: [
                            {
                                extend: "collection",
                                className: "btn btn-label-primary dropdown-toggle me-2",
                                text: '<i class="bx bx-export me-sm-2"></i> <span class="d-none d-sm-inline-block">خروجی</span>',
                                buttons: [
                                    {
                                        extend: "print",
                                        text: '<i class="bx bx-printer me-2" ></i>پرینت',
                                        className: "dropdown-item",
                                        exportOptions: {
                                            columns: [3, 4, 5, 6, 7],
                                            format: {
                                                body: function (e, t, a) {
                                                    var s;
                                                    return e.length <= 0
                                                        ? e
                                                        : ((e = $.parseHTML(e)),
                                                          (s = ""),
                                                          $.each(e, function (e, t) {
                                                              void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                                                          }),
                                                          s);
                                                },
                                            },
                                        },
                                        customize: function (e) {
                                            $(e.document.body).css("color", config.colors.headingColor).css("border-color", config.colors.borderColor).css("background-color", config.colors.bodyBg),
                                                $(e.document.body).find("table").addClass("compact").css("color", "inherit").css("border-color", "inherit").css("background-color", "inherit");
                                        },
                                    },
                                    {
                                        extend: "csv",
                                        text: '<i class="bx bx-file me-2" ></i>خروجی اکسل',
                                        className: "dropdown-item",
                                        exportOptions: {
                                            columns: [3, 4, 5, 6, 7],
                                            format: {
                                                body: function (e, t, a) {
                                                    var s;
                                                    return e.length <= 0
                                                        ? e
                                                        : ((e = $.parseHTML(e)),
                                                          (s = ""),
                                                          $.each(e, function (e, t) {
                                                              void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                                                          }),
                                                          s);
                                                },
                                            },
                                        },
                                    },
                                    {
                                        extend: "excel",
                                        text: "Excel",
                                        className: "dropdown-item",
                                        exportOptions: {
                                            columns: [3, 4, 5, 6, 7],
                                            format: {
                                                body: function (e, t, a) {
                                                    var s;
                                                    return e.length <= 0
                                                        ? e
                                                        : ((e = $.parseHTML(e)),
                                                          (s = ""),
                                                          $.each(e, function (e, t) {
                                                              void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                                                          }),
                                                          s);
                                                },
                                            },
                                        },
                                    },
                                    {
                                        extend: "pdf",
                                        text: '<i class="bx bxs-file-pdf me-2"></i>خروجی PDF',
                                        className: "dropdown-item",
                                        exportOptions: {
                                            columns: [3, 4, 5, 6, 7],
                                            format: {
                                                body: function (e, t, a) {
                                                    var s;
                                                    return e.length <= 0
                                                        ? e
                                                        : ((e = $.parseHTML(e)),
                                                          (s = ""),
                                                          $.each(e, function (e, t) {
                                                              void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                                                          }),
                                                          s);
                                                },
                                            },
                                        },
                                    },
                                    {
                                        extend: "copy",
                                        text: '<i class="bx bx-copy me-2" ></i>کپی کردن',
                                        className: "dropdown-item",
                                        exportOptions: {
                                            columns: [3, 4, 5, 6, 7],
                                            format: {
                                                body: function (e, t, a) {
                                                    var s;
                                                    return e.length <= 0
                                                        ? e
                                                        : ((e = $.parseHTML(e)),
                                                          (s = ""),
                                                          $.each(e, function (e, t) {
                                                              void 0 !== t.classList && t.classList.contains("user-name") ? (s += t.lastChild.firstChild.textContent) : void 0 === t.innerText ? (s += t.textContent) : (s += t.innerText);
                                                          }),
                                                          s);
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                            { text: '<i class="bx bx-plus me-sm-2"></i> <span class="d-none d-sm-inline-block">افزودن درآمد</span>', className: "create-new btn btn-primary" },
                        ],
                        responsive: {
                            details: {
                                display: $.fn.dataTable.Responsive.display.modal({
                                    header: function (e) {
                                        return "Details of " + e.data().title_t;
                                    },
                                }),
                                type: "column",
                                renderer: function (e, t, a) {
                                    a = $.map(a, function (e, t) {
                                        return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td>' + e.title + ":</td> <td>" + e.data + "</td></tr>" : "";
                                    }).join("");
                                    return !!a && $('<table class="table"/><tbody />').append(a);
                                },
                            },
                        },
                    })),
                    $("div.head-label").html('<h5 class="card-title mb-0">جدول ثبت خرجی</h5>')),
                101);
        fv.on("core.form.valid", function () {
            var e = $(".add-new-record .dt-title_t").val(),
                t = $(".add-new-record .dt-type_payment").val(basicType_payment),
                s = $(".add-new-record .dt-date").val(),
                n = $(".add-new-record .dt-salary").val();
            "" != e && (l.row.add({title_t: e, type_payment: t, start_date: s, salary: n + " تومان" }).draw(), offCanvasEl.hide());
        }),
            $(".datatables-basic tbody").on("click", ".delete-record", function () {
                l.row($(this).parents("tr")).remove().draw();
            }),
            a.length &&
                a.DataTable({
                    columns: [{ data: "title_t" }, { data: "type_payment" }, { data: "" }, { data: "salary" }, { data: "" }, { data: "" }],
                    dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>><"table-responsive"t><"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                    displayLength: 7,
                    lengthMenu: [7, 10, 25, 50, 75, 100],
                }),
            s.length &&
                ((t = s.DataTable({
                    columns: [{ data: "" }, { data: "title_t" }, { data: "type_payment" }, { data: "" }, { data: "start_date" }, { data: "salary" }, { data: "" }, { data: "" }],
                    columnDefs: [
                        {
                            className: "control",
                            orderable: !1,
                            targets: 0,
                            searchable: !1,
                            render: function (e, t, a, s) {
                                return "";
                            },
                        },
                        { visible: !1, targets: 2 },

                    ],
                    order: [[2, "asc"]],
                    dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                    displayLength: 7,
                    lengthMenu: [7, 10, 25, 50, 75, 100],
                    drawCallback: function (e) {
                        var t = this.api(),
                            a = t.rows({ page: "current" }).nodes(),
                            s = null;
                        t.column(2, { page: "current" })
                            .data()
                            .each(function (e, t) {
                                s !== e &&
                                    ($(a)
                                        .eq(t)
                                        .before('<tr class="group"><td colspan="8">' + e + "</td></tr>"),
                                    (s = e));
                            });
                    },
                    responsive: {
                        details: {
                            display: $.fn.dataTable.Responsive.display.modal({
                                header: function (e) {
                                    return "Details of " + e.data().title_t;
                                },
                            }),
                            type: "column",
                            renderer: function (e, t, a) {
                                a = $.map(a, function (e, t) {
                                    return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td>' + e.title + ":</td> <td>" + e.data + "</td></tr>" : "";
                                }).join("");
                                return !!a && $('<table class="table"/><tbody />').append(a);
                            },
                        },
                    },
                })),
                $(".dt-row-grouping tbody").on("click", "tr.group", function () {
                    var e = t.order()[0];
                    (2 === e[0] && "asc" === e[1] ? t.order([2, "desc"]) : t.order([2, "asc"])).draw();
                }));
        n.length &&
            n.DataTable({
                columns: [{ data: "" }, { data: "title_t" }, { data: "type_payment" }, { data: "start_date" }, { data: "salary" }, { data: "" }, { data: "" }],
                columnDefs: [
                    {
                        className: "control",
                        orderable: !1,
                        targets: 0,
                        searchable: !1,
                        render: function (e, t, a, s) {
                            return "";
                        },
                    },

                ],
                language: { url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/German.json" },
                displayLength: 7,
                dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
                lengthMenu: [7, 10, 25, 50, 75, 100],
                responsive: {
                    details: {
                        display: $.fn.dataTable.Responsive.display.modal({
                            header: function (e) {
                                return "Details of " + e.data().title_t;
                            },
                        }),
                        type: "column",
                        renderer: function (e, t, a) {
                            a = $.map(a, function (e, t) {
                                return "" !== e.title ? '<tr data-dt-row="' + e.rowIndex + '" data-dt-column="' + e.columnIndex + '"><td>' + e.title + ":</td> <td>" + e.data + "</td></tr>" : "";
                            }).join("");
                            return !!a && $('<table class="table"/><tbody />').append(a);
                        },
                    },
                },
            }),
            setTimeout(() => {
                $(".dataTables_filter .form-control").removeClass("form-control-sm"), $(".dataTables_length .form-select").removeClass("form-select-sm");
            }, 300);
    });
