import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loginscreen: {
    flex: 1,
    backgroundColor: "#EEF1FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    width: "100%",
  },
  loginheading: {
    fontSize: 26,
    marginBottom: 10,
  },
  logininputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logininput: {
    borderWidth: 1,
    width: "90%",
    padding: 8,
    borderRadius: 2,
  },
  loginbutton: {
    backgroundColor: "green",
    padding: 12,
    marginVertical: 10,
    width: "60%",
    borderRadius: "50%",
    elevation: 1,
  },
  loginbuttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
  chatscreen: {
    backgroundColor: "#F7F7F7",
    flex: 1,
    padding: 10,
    fontSize: 10,
    position: "relative",
  },
  chatheading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0E3D8B",
  },
  chattopContainer: {
    backgroundColor: "#F7F7F7",
    height: 70,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    marginBottom: 15,
    elevation: 2,
    borderColor: "#fff",
  },
  chatheader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#fff",
  },
  chatlistContainer: {
    paddingHorizontal: 10,
  },
  chatemptyContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  chatemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30 },
  messagingscreen: {
    flex: 1,
  },
  messaginginputContainer: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  messaginginput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
  },
  messagingbuttonContainer: {
    width: "30%",
    backgroundColor: "green",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  modalbutton: {
    width: "40%",
    height: 40,
    backgroundColor: "#0E3D8B",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#111",
  },
  modalbuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modaltext: {
    color: "#111",
  },
  modalContainer: {
    width: "100%",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    elevation: 1,
    height: 500,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  sameRow:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  modalinput: {
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 20,
    width:'100%'
  },
  modalsubheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  mmessageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  mmessage: {
    maxWidth: "50%",
    backgroundColor: "#f5ccc2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
  },
  mvatar: {
    marginRight: 5,
  },
  cchat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    height: 80,
    marginBottom: 10,
  },
  cavatar: {
    marginRight: 15,
    height:40,
    width:40,
    borderRadius:50
  },
  cusername: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  cmessage: {
    fontSize: 14,
    opacity: 0.7,
  },
  crightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  ctime: {
    opacity: 0.5,
  },
  userItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  userItemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  unFOllowBtn:{
    padding:8,
    color:"#fff",
    backgroundColor:"darkcyan",
    borderRadius:10
  }
});
