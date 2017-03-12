[33mcommit b40634e24a77871dcd8c6f399f00e793c4d95380[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Sat Mar 11 17:36:29 2017 +0700

    Styling, show text 'No one hired yet' if an employee type does not have any employee

[33mcommit 05dc259b272c2396e5340f733d19a9d98f4f7bb0[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Fri Mar 10 21:48:14 2017 +0700

    Update README.md

[33mcommit 5b609362f7e42be5d31bfbbbbc86f9f4a0463e9b[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Fri Mar 10 21:46:16 2017 +0700

    Support toggle sorting, TODO: investigate Ember.set()

[33mcommit 2b617eca9a9b44c17be767793b3d62d364d5e92d[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Fri Mar 10 21:23:07 2017 +0700

    Basic sorting on employee types, correct relation between employeetype and employee

[33mcommit bffa77e1e30a4dd09c9cccdaf87b5f57bea0f691[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Fri Mar 10 21:22:17 2017 +0700

    Add bootstrap fonts. Not yet working

[33mcommit e627a069183960d68e48fc6fdcf875270418aabd[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Thu Mar 9 15:22:29 2017 +0700

    Override the keyForRelationship, and simply return the passed in key.

[33mcommit f2f31b1e9f494558c0b2a750a44c3f4e9c04ca61[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Wed Mar 8 21:18:34 2017 +0700

    1. Add check null in models.note totalLenght method  2.Modify employee serializer payload generation to work with task_tracking backend, debt: need to investigate json api standard format and apply

[33mcommit 2371ee52661090b78512f6aeb0b7ab2896117211[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Mon Mar 6 11:15:46 2017 +0700

    Add awesome comment

[33mcommit ce3c9a5cad43f90d8485a1680f56e89a95315b42[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Thu Mar 2 21:53:17 2017 +0700

    Add base route, employee route, and use emberx-select

[33mcommit 410ecf12ee0124a9f7d7e4e4da10532a234e8476[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Thu Mar 2 15:50:12 2017 +0700

    Render note template to Main route, instead of render as nested template"

[33mcommit e0f6f7bbb9d1c742914187f162ca331e9b06f35f[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Thu Mar 2 13:00:27 2017 +0700

    Correct serializer

[33mcommit dd8bba4e36e3e6cbb916f452a61fb64abe76dc0f[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Thu Mar 2 12:33:38 2017 +0700

    Add more models and route

[33mcommit 43aa3dd56d75f3d5d2617fbc74d9e50812afe08c[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Wed Mar 1 11:52:22 2017 +0700

    Upgrade to Ember v2.11.0

[33mcommit 397ae91bcb7e49aee424add92b429c9482f5a01d[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Tue Feb 28 18:41:29 2017 +0700

    First look at Emberjs Component

[33mcommit f812d780615d5b397700be32afba6cc569a4ad08[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Mon Feb 27 20:19:00 2017 +0700

    1. Default pod structure by setting .ember-cli  2. Implement routing segment

[33mcommit 4a8e11ed9895259281592de6f5385b140cf06b6b[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Tue Feb 21 19:54:33 2017 +0700

    Nedb seems to require correct type of value passed in

[33mcommit dd1941f42b471f104affc7adbef074418249d0a7[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Tue Feb 21 17:04:43 2017 +0700

    Save, delete note

[33mcommit 53b7436fc814bc40c1731e845e4179bd86f4ad9c[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Tue Feb 21 12:02:43 2017 +0700

    Modify object mapping + Add new child route <note>

[33mcommit 2019e26a4dcbff29c628394f151897ced3e9c332[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Mon Feb 20 23:46:25 2017 +0700

    Make retrieval JsonApi compliant

[33mcommit e397ca62dcef0088f8f8a566a1d82422ef7c2ac8[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Mon Feb 20 22:00:54 2017 +0700

    Add notebook, note object. Debt: revisit saving jsonapi style

[33mcommit 39ff2e20e9c28a13be163f3b35f810917888d469[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Sun Feb 19 22:40:35 2017 +0700

    Modify search in server side to return jsonapi-compliant data

[33mcommit d60b88dd49af26a5d6702c09e6e281b07c1df2c6[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Wed Feb 15 18:39:24 2017 +0700

    Make saving user works by doing a bunch of workarounds.

[33mcommit 1ca2dcbb1e2b1aa06ccf9d94bf5f9d0b8714a1f5[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Wed Feb 15 12:51:08 2017 +0700

    1. Configure to run smoother in Windows. 2. Add mock api

[33mcommit a9ad41d645e6f04779e231925a49ea14ec9e7a91[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Wed Feb 15 12:50:54 2017 +0700

    1. Configure to run smoother in Windows. 2. Add mock api

[33mcommit 8f529df2953e2bdb059995b966b73ccc2fa957fc[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Tue Feb 14 21:57:51 2017 +0700

    Initial commit

[33mcommit dd21911e7ca07d452853492c01bd811eb3fa3a69[m
Author: Khoa Tran <trandangkhoa@tma.com.vn>
Date:   Tue Feb 14 16:10:01 2017 +0700

    Initial commit
