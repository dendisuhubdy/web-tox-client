import { Vue } from 'vue-property-decorator';
import Item from '@/components/Item/index.vue';
export default Vue.extend({
  name: 'list',
  components: { Item },
  props: ['type'],
  data() {
    return {};
  },
  computed: {
    rooms(): object[] {
      return this.$store.state.rooms.filter((room: any, id: number) => {
        if (room.type === 'group') {
          room.id = id;
          return room;
        }
      });
    },
    people(): object[] {
      return this.$store.state.rooms.filter((room: any, id: number) => {
        if (room.type === 'people') {
          room.id = id;
          return room;
        }
      });
    },
    contacts(): object[] | undefined {
      if (this.$store.state.rooms.length) {
        const info = {...this.$store.state.info};
        delete info.friends;
        delete info.response;
        const arr = [];
        const selectedRoom = this.$store.state.selectedRoom;
        const numberFriend = this.$store.state.rooms[selectedRoom].number;
        arr.push(info);
        arr.push(this.$store.state.info.friends[numberFriend]);
        return arr;
      }
    },
  },
  mounted() {},
  methods: {
    add() {
      this.$store.commit('DIALOG_TRIGGER');
    },
  },
});
