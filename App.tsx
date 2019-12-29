import React, {Component} from 'react';
import {Container, Content, Text, Input} from 'native-base';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  AppState,
  View,
  StatusBar,
} from 'react-native';
import Highlighter from 'react-native-highlight-words';
import Fuse from 'fuse.js';

import pages, {Page} from './pages';
import Clock from './Clock';
import styles from './styles';

const options = {
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  tokenize: true,
  distance: 100,
  matchAllTokens: true,

  // includeScore: true,
  // maxPatternLength: 32,
  // minMatchCharLength: 1,
  keys: ['content'],
};

interface State {
  appState: string;
  weAreSafe: boolean;
  counter: number;
  pageNumber: number;
  query: string;
  useSearch: boolean;
  resultPages: Array<Page>;
  indexOfResult: number;
  searchNumber?: number | null;
}

export default class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      weAreSafe: false,
      counter: 0,
      pageNumber: 5,
      useSearch: false,
      query: '',
      resultPages: pages,
      indexOfResult: 0,
      searchNumber: null,
    };
  }

  componentDidMount(): void {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount(): void {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  private _handleAppStateChange = (nextAppState: string): void => {
    if (nextAppState.match(/inactive|background/)) {
      this.setState({weAreSafe: false, counter: 0});
    }
  };

  private _renderPageContent(): string {
    const {pageNumber} = this.state;
    const selectedPage: Page = pages.filter((page: Page) => {
      return page.number === pageNumber;
    })[0];
    // eslint-disable-next-line prettier/prettier
    return selectedPage?.content;
  }

  private _renderPageContentFromSearch(): string {
    const {indexOfResult, resultPages} = this.state;
    if (resultPages.length === 0) {
      return 'not found';
    }
    const selectedPage: Page = resultPages[indexOfResult];
    return selectedPage.content;
  }

  private nextPage(): void {
    const {useSearch, resultPages, indexOfResult} = this.state;
    if (useSearch) {
      if (indexOfResult + 1 < resultPages.length) {
        this.setState({indexOfResult: indexOfResult + 1});
      }
    } else {
      let max = 0;
      pages.forEach(page => {
        if (page.number > max) max = page.number;
      });
      // pages.forEach(page => {
      //   console.log(page.number);
      // });
      const {pageNumber} = this.state;
      if (max) {
        if (pageNumber + 1 <= max) {
          this.setState({pageNumber: pageNumber + 1});
        }
      }
    }
  }

  private pastPage(): void {
    const {useSearch, indexOfResult} = this.state;
    if (useSearch) {
      if (indexOfResult !== 0) {
        this.setState({indexOfResult: indexOfResult - 1});
      }
    } else {
      const min = 5;
      const {pageNumber} = this.state;
      if (pageNumber - 1 >= min) {
        this.setState({pageNumber: pageNumber - 1});
      }
    }
  }

  private _search = (): void => {
    const {query} = this.state;
    const fuse = new Fuse(pages, options);
    const result: Array<Page> = fuse.search(query);
    // console.log(result);
    this.setState({resultPages: result, useSearch: true, indexOfResult: 0});
  };

  private _searchByNumber(number: string): void {
    // eslint-disable-next-line radix
    const newNumber = parseInt(number);
    const max = pages[pages.length - 1].number;
    const min = pages[0].number;
    this.setState({
      pageNumber: number
        ? newNumber > max || newNumber < min
          ? 5
          : newNumber
        : 5,
      searchNumber: number ? newNumber : null,
      useSearch: false,
    });
  }

  _renderContent = (): Element => {
    if (this.state.weAreSafe) {
      return (
        <>
          <View style={styles.header}>
            <Input
              style={styles.wordSearch}
              placeholderTextColor="#838383"
              value={this.state.query}
              onChangeText={(query): void => this.setState({query})}
              placeholder="search for word..."
            />
            <Input
              style={styles.pageSearch}
              placeholderTextColor="#838383"
              placeholder="P.N"
              keyboardType="numeric"
              value={this.state.searchNumber?.toString()}
              onChangeText={(pageNumber): void =>
                this._searchByNumber(pageNumber)
              }
            />
            <TouchableOpacity
              style={styles.searchBtn}
              onLongPress={(): void =>
                this.setState({weAreSafe: false, counter: 0})
              }
              onPress={(): void => this._search()}>
              <Text style={styles.OK}>OK</Text>
            </TouchableOpacity>
          </View>
          {this.state.useSearch ? (
            <>
              <Content style={styles.container}>
                <TouchableOpacity
                  onPress={(): void => this.setState({useSearch: false})}>
                  <Text style={styles.default}>default</Text>
                </TouchableOpacity>
                <Highlighter
                  style={styles.content}
                  textToHighlight={this._renderPageContentFromSearch()}
                  searchWords={this.state.query.split(' ')}
                  highlightStyle={styles.highlight}
                />
              </Content>
              <View style={styles.footer}>
                <TouchableOpacity onPress={(): void => this.pastPage()}>
                  <Text style={styles.nextPrev}>Prev</Text>
                </TouchableOpacity>
                <Text style={styles.page}>
                  {this.state.resultPages[this.state.indexOfResult]?.number}
                </Text>
                <TouchableOpacity onPress={(): void => this.nextPage()}>
                  <Text style={styles.nextPrev}>Next</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Content style={styles.container}>
                <Text style={styles.content}>{this._renderPageContent()}</Text>
              </Content>
              <View style={styles.footer}>
                <TouchableOpacity onPress={(): void => this.pastPage()}>
                  <Text style={styles.nextPrev}>Prev</Text>
                </TouchableOpacity>
                <Text style={styles.page}>{this.state.pageNumber}</Text>
                <TouchableOpacity onPress={(): void => this.nextPage()}>
                  <Text style={styles.nextPrev}>Next</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      );
    }
    return (
      <Clock
        activeSafeMood={this._ActivateCheat.bind(this)}
        increaseCount={this._increaseCount.bind(this)}
      />
    );
  };

  _increaseCount = (): void => {
    this.setState((prevState: State) => {
      return {
        counter: prevState.counter + 1,
      };
    });
  };

  _ActivateCheat = (): void => {
    if (this.state.counter >= 3) {
      this.setState({weAreSafe: true});
    }
  };

  render(): Element {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <SafeAreaView style={styles.top} />
        {this._renderContent()}
        <SafeAreaView style={styles.bottom} />
      </Container>
    );
  }
}
