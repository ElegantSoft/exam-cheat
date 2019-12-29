import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import styles from './styles';
import {Input, Container, Content, Row} from 'native-base';

interface Props {
  activeSafeMood(): void;
  increaseCount(): void;
}

const Clock: React.FC<Props> = ({activeSafeMood, increaseCount}) => {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  return (
    <>
      <Container>
        <View style={[styles.header, styles.SHeader]}>
          <TouchableOpacity style={styles.SBtn}>
            <Text style={styles.SOK}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.SBtn}>
            <Text style={styles.SOK}>+</Text>
          </TouchableOpacity>
        </View>
        <Content style={styles.container}>
          <View style={styles.alarmContainer}>
            <Text style={styles.Alarm}>Alarm</Text>
          </View>
          {/* times */}
          <Row>
            <View style={styles.alarmContainer}>
              <Row>
                <Text style={styles.time}>1:45</Text>
                <Text style={styles.timeDay}>PM</Text>
              </Row>
              <Text style={styles.repeat}>Repeat: Daily</Text>
            </View>
            <View style={styles.switch}>
              <Switch
                value={active}
                thumbColor="orange"
                trackColor={{true: '#eab052', false: '#666666'}}
                onValueChange={(): void => {
                  activeSafeMood();
                  setActive(!active);
                }}
              />
            </View>
          </Row>
          <Row>
            <View style={styles.alarmContainer}>
              <Row>
                <Text style={styles.time}>9:45</Text>
                <Text style={styles.timeDay}>AM</Text>
              </Row>
              <Text style={styles.repeat}>Repeat: Friday</Text>
            </View>
            <View style={styles.switch}>
              <Switch
                value={active2}
                thumbColor="orange"
                trackColor={{true: '#eab052', false: '#666666'}}
                onValueChange={(): void => {
                  setActive2(!active2);
                }}
              />
            </View>
          </Row>
          <Row>
            <View style={styles.alarmContainer}>
              <Row>
                <Text style={styles.time}>5:00</Text>
                <Text style={styles.timeDay}>AM</Text>
              </Row>
              <Text style={styles.repeat}>Repeat: Daily</Text>
            </View>
            <View style={styles.switch}>
              <Switch
                value={active3}
                thumbColor="orange"
                trackColor={{true: '#eab052', false: '#666666'}}
                onValueChange={(): void => {
                  increaseCount();
                  setActive3(!active3);
                }}
              />
            </View>
          </Row>
        </Content>
      </Container>
    </>
  );
};

export default Clock;
