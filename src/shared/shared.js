/** shared.js */
export default {
  state: {
    isAuthenticated: false,
    editingItem: {},
    selectedItems: [],
    notifications: [
      {
        id: 1238,
        createdAt: new Date('2020-01-01 00:11:22'),
        content: "Welcome to Antonelli",
        read: false,
        checked: false,
      },
      {
        id: 2983,
        createdAt: new Date('2020-01-10 08:23:01'),
        content: "Your coupon has been created",
        read: false,
        checked: false,
      },
      {
        id: 3234,
        createdAt: new Date('2020-01-17 11:13:21'),
        content: "Your promo has been deployed",
        read: false,
        checked: false,
      },
    ],
    settings: {},
  },
  currentUser: {
    username: {
      value:'',
      readonly: true,
    },
    nickname: {
      value: 'Awe',
      readonly: false,
    },
    password: {
      value: 'encrepted',
      readonly: true,
    },
    avatar: {
      value: 'http://getdrawings.com/images/birthday-cupcake-drawing-34.jpg',
      readonly: false,
    },
    email: {
      value: 'yebi@email.com',
      readonly: false,
    },
    mobile: {
      value: '12345678900987',
      readonly: false,
    },
  },
  compData: {
    'Marketing': {
      items: {
        "coupon": [
          {
            id: 76811,
            name: 'coupon-1',
            data: {
              type: 2983,
              createdAt: Date('2020-01-10 08:23:01'),
              dateRange: {
                start: '11/01/1919',
                end: '11/03/2020',
              },
              X: [{id:123,name:'iii'}],
              n: 2,
              Y: [{id:144,name:'uuu'}],
              m: 1,
            }
          },
          {
            id: 23098,
            name: 'coupon-2',
            data: {
              type: 1928,
              createdAt: Date('2018-01-10 08:23:01'),
              dateRange: {
                start: '11/01/1919',
                end: '11/03/2020',
              },
              X: [{id:123,name:'hhh'},],
              percent: 30,
            }
          }
        ],
        "ltoffer": [{
          id: 4567,
          name: 'limited-time offer-1',
          data: {
            createdAt: Date('2020-01-10 08:23:01'),
            dateRange: {
              start: '11/01/1919',
              end: '11/03/2020',
            },
            skus: [{id:123,name:'sldkfj'},{id:213,name:'iu'},{id:121,name:'sdkf'},],
            type: {
              id: 5667,
              value: 40.2,
            },
          }
        }],
        "bxgy": [{
          id: 987,
          name: 'bxgy-1',
          data: {
            createdAt: Date('2020-01-10 08:23:01'),
            dateRange: {
              start: '01/11/2001',
              end: '11/05/2005',
            },
            X: [{id:887,name:'lkoien'},],
            n: 2,
            Y: [{id:98721,name:'ouiqwe'},],
            m: 1,
          }
        }],
      },
    },
  },
  updateAuthenticated(val) {
    this.state.isAuthenticated = val;
  },
  getAuthenticated() {
    return this.state.isAuthenticated;
  },
  setState(name, data) {
    this.state[name] = data;
  },
  getState(name) {
    return this.state[name];
  },
  updateCurrentUser(val) {
    if (val.username !== null) {
      this.currentUser.username.value = val.username;
    }
  },
  getCurrentUser() {
    return this.currentUser;
  },
  setSelectedItems(items) {
    this.state.selectedItems = items;
  },
  getSelectedItems() {
    return this.state.selectedItems;
  },
  getCompData(name) {
    return this.compData[name];
  },
  setCompData(name, data) {
    this.compData[name] = data;
  },
};
