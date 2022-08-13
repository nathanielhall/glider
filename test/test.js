const Nightmare = require('nightmare')
const assert = require('assert')

describe('Load a Page', function () {
    // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
    this.timeout('10s');

    let nightmare = null;
    let nightMareInstance = null;
    before(() => {
        nightmare = new Nightmare({ show: false });
        nightMareInstance = nightmare.goto('http://localhost:3000');
    });

    it('Check if app is launched', done => {
        nightMareInstance
            .evaluate(() => {
                return document.title;
            })
            .then((title) => {
                assert.equal(title, 'Expense Management System');
                done();
            })
    });

    it('Register', done => {
        // your actual testing urls will likely be `http://localhost:port/path`
        nightMareInstance = nightmare.goto('http://localhost:3000/register');
        nightMareInstance
            .evaluate(() => {
                return document.querySelectorAll('#userRegisterForm').length;
            })
            .then(function (formcount) {
                if (formcount != 1) {
                    assert.equal(31, 41);
                    done();
                } else {
                    nightMareInstance
                        .type("input[name='username']", "Test User")
                        .type("input[name='email']", "test1@test.com")
                        .type("input[name='password']", "a")
                        .type("input[name='confirmpassword']", "a")
                        .click('button[type=submit]')
                        .wait(500);

                    nightMareInstance
                        .evaluate(() => {
                            return document.querySelectorAll('#userLoginForm').length;
                        })
                        .then(function (count) {
                            assert.equal(count, 1);
                            done();
                        })
                        .catch(function () {
                            assert.equal(32, 42);
                            done();
                        })
                }
            })
            .catch(function () {
                assert.equal(33, 43);
                done();
            })
    });

    it('Login', done => {
        nightMareInstance = nightmare.goto('http://localhost:3000');
        nightMareInstance
            .click(".login-btn a")
            .wait(400)
            .evaluate(() => {
                return document.querySelectorAll('#userLoginForm').length;

            })
            .then((formcount) => {

                if (formcount != 1) {
                    assert.equal(34, 44);
                    done();
                } else {
                    nightMareInstance
                        .type("input[name='email']", "test1@test.com")
                        .type("input[name='password']", "a")
                        .click("button[type='submit']")
                        .wait(500)
                        .evaluate(() => {
                            return document.querySelectorAll('#main').length;
                        })
                        .then(function (count) {
                            assert.equal(count, 1);
                            done();
                        })
                        .catch(function () {
                            assert.equal(35, 45);
                            done();
                        })
                }
            })
            .catch(function () {
                assert.equal(36, 46);
                done();
            })
    });

    it('EditExpense', done => {
        nightMareInstance = nightmare.goto('http://localhost:3000/expenses');
        nightMareInstance
            .evaluate(() => {
                return document.querySelectorAll('.react-bs-container-body .table tbody tr').length;
            })
            .then((count) => {
                if (count > 0) {
                    nightMareInstance
                        .click(".react-bs-container-body table tbody tr:nth-child(1) td:nth-child(7) div a i")
                        .wait(400)
                        .evaluate(() => {
                            document.querySelector("input[name='title']").value = "Toms";
                            return document.querySelectorAll("#EditForm").length;
                        })
                        .then((count) => {
                            if (count != 1) {
                                assert.equal(65, 75);
                                done();
                            } else {
                                nightMareInstance
                                    .click('button[type=submit]')
                                    .wait(400)
                                    .evaluate(() => {
                                        return document.querySelector('.react-bs-container-body table tbody tr:nth-child(1) td:nth-child(2)').innerText;
                                    })
                                    .then((title) => {
                                        assert.equal(title, "Toms");
                                        done();
                                    })
                            }
                        })
                        .catch(function () {
                            assert.equal(66, 76);
                            done();
                        })
                }
            })
            .catch(function () {
                assert.equal(67, 77);
                done();
            })
    })

    it('DeleteExpense', done => {
        nightMareInstance = nightmare.goto('http://localhost:3000/expenses');
        nightMareInstance
            .wait(400)
            .evaluate(() => {
                return document.querySelectorAll('.react-bs-container-body .table tbody tr').length;
            })
            .then((content) => {
                nightMareInstance
                    .click(".react-bs-container-body table tbody tr:nth-child(1) td:nth-child(8) div a i")
                    .wait(1000)
                    .evaluate(() => {
                        return document.querySelectorAll("#DeleteModal").length;
                    })
                    .then((count) => {
                        if (count != 1) {
                            assert.equal(68, 78);
                            done();
                        } else {
                            nightMareInstance
                                .evaluate(() => {
                                    return document.querySelector('.react-bs-container-body table tbody tr:nth-child(1) td:nth-child(2)').innerText;
                                })
                                .then((ftitle) => {
                                    nightMareInstance
                                        .click('.modal-footer button:nth-child(1)')
                                        .wait(500)
                                        .evaluate(() => {
                                            return document.querySelector('.react-bs-container-body table tbody tr:nth-child(1) td:nth-child(2)').innerText;
                                        })
                                        .then((ltitle) => {
                                            if (ftitle != ltitle) {
                                                assert.equal(1, 1);
                                                done();
                                            } else {
                                                assert.equal(69, 70);
                                                done();
                                            }
                                        })
                                })
                        }
                    })
                    .catch(function () {
                        assert.equal(81, 91);
                        done();
                    })
            })
            .catch(function () {
                assert.equal(82, 92);
                done();
            })
    });

    it('Report by category', done => {
        nightMareInstance = nightmare.goto('http://localhost:3000/expenses');
        nightMareInstance
            .click('nav .dropdown ul li:nth-child(1) a')
            .wait(400)
            .evaluate(() => {
                return document.querySelectorAll('.reports-list .react-bs-container-body tbody tr').length;
            })
            .then((count) => {
                if (count > 0) {
                    nightMareInstance
                        .click(".reports-list .react-bs-container-body tbody tr:nth-child(1)")
                        .wait(400)
                        .evaluate(() => {
                            return document.querySelectorAll('.report-detail .react-bs-container-body tbody tr').length;
                        })
                        .then((count) => {
                            if (count > 0) {
                                assert.equal(84, 84);
                                done();
                            } else {
                                assert.equal(85, 95);
                                done();
                            }
                        })
                        .catch(function () {
                            assert.equal(86, 96);
                            done();
                        })
                } else {
                    assert.equal(87, 97);
                    done();
                }

            })
            .catch(function () {
                assert.equal(88, 98);
                done();
            })
    });


    it('Expense Report', done => {
        let reports;
        nightMareInstance = nightmare.goto('http://localhost:3000/report_s');
        nightMareInstance
            .wait(400)
            .evaluate(() => {
                return document.querySelectorAll('.expenses-table-content .react-bs-container-body table tbody tr').length;
            })
            .then(count => {
                reports = count;
                nightMareInstance
                    .evaluate(() => {
                        return document.querySelectorAll('#new-report').length;
                    })
                    .then((count) => {
                        if (count != 1) {
                            assert.equal(74, 75);
                            done();
                        } else {
                            nightMareInstance
                                .click('#new-report')
                                .wait(400)
                                .evaluate(() => {
                                    return document.querySelectorAll("input[name='title']").length;
                                })
                                .then((count) => {
                                    if (!count) {
                                        assert.equal(85, 86);
                                        done()
                                    } else {
                                        nightMareInstance
                                            .type("input[name='title']", "")
                                            .type("input[name='title']", "New Report")
                                            .evaluate(() => {
                                                return document.querySelectorAll('.react-bs-container-body .table tbody tr:nth-child(1)').length;
                                            })
                                            .then(count => {
                                                if (count > 0) {
                                                    nightMareInstance
                                                        .click("#expenses-table .react-bs-container-body table tbody tr:nth-child(1)")
                                                        .click(".modal-footer button:nth-child(1)")
                                                        .wait(800)
                                                        .evaluate(() => {
                                                            return document.querySelector('.react-bs-container-body .table tbody tr:nth-child(1) td:nth-child(2)').innerText
                                                        })
                                                        .then(count => {
                                                            if (count == "New Report") {
                                                                assert.equal(1, 1);
                                                                done();
                                                            } else {
                                                                assert.equal(114, 115);
                                                                done();
                                                            }
                                                        })
                                                } else {
                                                    assert.equal(106, 107);
                                                    done();
                                                }
                                            })
                                    }

                                })
                        }
                    })
            })

    });

 


    it('ExpensePagination', done => {
        nightMareInstance = nightmare.goto('http://localhost:3000/expenses');
        nightMareInstance
            .wait(400)
            .evaluate(() => {
                return document.querySelector('.react-bs-container-body table tbody tr:nth-child(1) td:nth-child(2)').innerText;
            })
            .then((content) => {
                let firstcontent = content;

                nightMareInstance
                    .click(".pagination li:last-child a")
                    .wait(400)
                    .evaluate(() => {
                        return document.querySelector('.react-bs-container-body table tbody tr:nth-child(1) td:nth-child(2)').innerText;
                    })
                    .then((content) => {
                        if (content == "") {
                            assert.equal(30, 40);
                            done();
                        } else if (firstcontent == content) {
                            assert.equal(37, 47);
                            done();
                        } else {
                            assert.equal(38, 38);
                            done();
                        }
                    })
                    .catch(function () {
                        assert.equal(39, 49);
                        done();
                    })

            })
            .catch(function () {
                assert.equal(50, 60);
                done();
            })
    });

    it('Sort-Filter', done => {
        let searchField = [{ price1: "1000", price2: "40000" }];

        nightMareInstance = nightmare.goto('http://localhost:3000/expenses');
        nightMareInstance
            .wait(400)
            .evaluate(() => {
                return document.querySelectorAll('.react-bs-container-body .table tbody tr').length;
            })
            .then((content) => {
                let firstCount = content;
                nightMareInstance
                    .type("input[name='startprice']", searchField[0].price1)
                    .type("input[name='endprice']", searchField[0].price2)
                    .click("button[name='price']")
                    .wait(500)
                    .evaluate(() => {
                        let count = document.querySelectorAll('.react-bs-container-body .table tbody tr').length;
                        let firstItem = document.querySelector('.react-bs-container-body table tbody tr:nth-child(1) td:nth-child(3)').innerText;
                        let lastItem = document.querySelector('.react-bs-container-body table tbody tr:nth-child(' + count + ') td:nth-child(3)').innerText;
                        let result = [{ count: count, firstItem: firstItem, lastItem: lastItem }];
                        return result;
                    })
                    .then((count) => {
                        let price1 = parseInt(count[0].firstItem, 10);
                        let price2 = parseInt(count[0].lastItem, 10);
                        let con1 = parseInt(searchField[0].price1, 10);
                        let con2 = parseInt(searchField[0].price2, 10);
                        if (count[0].count > 1) {
                            if (con1 < price1 < con2 && con1 < price2 < con2) {
                                assert.equal(1, 1);
                                done();
                            } else {
                                assert.equal(61, 71);
                                done();
                            }
                        } else if (count[0].count == 1) {
                            assert.equal(1, 1);
                            done()
                        } else {
                            assert.equal(62, 72);
                            done();
                        }
                    })
                    .catch(function () {
                        assert.equal(63, 73);
                        done();
                    })
            })
            .catch(function () {
                assert.equal(64, 74);
                done();
            })
    });
});

