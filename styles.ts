import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#171717',
  },
  bottom: {
    backgroundColor: '#222931',
  },
  container: {
    backgroundColor: '#101317',
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#222931',
    borderTopColor: '#434E5C',
    borderTopWidth: 0.6,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  page: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold',
  },
  nextPrev: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 30,
  },
  safe: {
    height: 300,
    width: 300,
    backgroundColor: '#fff',
  },
  safeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  header: {
    backgroundColor: '#171717',
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 0.6,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  wordSearch: {
    backgroundColor: '#3B3B3B',
    flex: 3,
    paddingTop: 2,
    paddingBottom: 2,
    height: 34,
    borderRadius: 8,
    marginRight: 9,
    color: '#fff',
  },
  pageSearch: {
    backgroundColor: '#3B3B3B',
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2,
    height: 34,
    borderRadius: 8,
    marginRight: 9,
    textAlign: 'center',
    color: '#fff',
  },
  searchBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#344150',
    borderRadius: 8,
  },
  OK: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  highlight: {
    color: '#000',
    backgroundColor: 'orange',
  },
  default: {
    color: '#fff',
    textAlign: 'right',
  },
  // safe clock
  SHeader: {
    justifyContent: 'space-between',
    elevation: 5,
  },
  SOK: {
    color: 'orange',
    fontSize: 18,
    fontWeight: '700',
  },
  SBtn: {
    padding: 5,
  },
  Alarm: {
    color: '#fff',
    fontSize: 29,
    fontWeight: '800',
    marginTop: 5,
  },
  alarmContainer: {
    borderBottomColor: '#333',
    borderBottomWidth: 0.3,
    paddingBottom: 10,
    flex: 1,
  },
  time: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '200',
    marginTop: 5,
  },
  timeDay: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '200',
    marginTop: 5,
    marginLeft: 10,
  },
  repeat: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '100',
  },
  switch: {
    marginTop: 5,
    height: '100%',
    justifyContent: 'center',
  },
});

export default styles;
