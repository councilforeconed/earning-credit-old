/*global define*/

define([
  'collections/survey'
], function (SurveyCollection) {
  'use strict';

  var survey = [
    {
      'number': '1',
      'question': 'Imagine you are 30 years old. You will face many bills – including rent or mortgage, possibly diapers and daycare, college loans, utilities, and transportation costs. How many times in one year do you anticipate you would be late on a payment?',
      'answers': [
        {
          'text': 'Never ',
          'value': 200
        },
        {
          'text': '1-2 times',
          'value': 180
        },
        {
          'text': '3-4 times',
          'value': 160
        },
        {
          'text': '5-6 times',
          'value': 140
        },
        {
          'text': '7-8 times',
          'value': 40
        },
        {
          'text': 'More than 8 times',
          'value': 0
        }
      ]
    },
    {
      'number': '2',
      'question': 'Imagine you are 30 years old. Not including a mortgage (to buy a home), how much consumer debt do you expect to have? Include student loans, car loans, credit card and any other debts.',
      'answers': [
        {
          'text': '0 to $5,000',
          'value': 160
        },
        {
          'text': '$5,001 to $10,000',
          'value': 140
        },
        {
          'text': '$10,001 to $15,000',
          'value': 100
        },
        {
          'text': '$15,001 to $25,000',
          'value': 60
        },
        {
          'text': 'Above $25,000',
          'value': 20
        }
      ]
    },
    {
      'number': '3',
      'question': 'Imagine you are 30 years old. At what age did you first apply for a credit card or loan?',
      'answers': [
        {
          'text': '18 or younger',
          'value': 80
        },
        {
          'text': '19-22',
          'value': 70
        },
        {
          'text': '23-25',
          'value': 60
        },
        {
          'text': '26-30',
          'value': 50
        },
        {
          'text': 'I have never applied for credit',
          'value': 0
        }
      ]
    },
    {
      'number': '4',
      'question': 'Imagine you are 30 years old. How many of the following accounts do you have currently have?',
      'answers': [
        {
          'text': '1 of each type',
          'value': 55
        },
        {
          'text': '5 types checked',
          'value': 50
        },
        {
          'text': '4 types checked',
          'value': 40
        },
        {
          'text': '3 types checked',
          'value': 30
        },
        {
          'text': '2 types checked',
          'value': 20
        },
        {
          'text': '1 type checked',
          'value': 10
        },
        {
          'text': '0 types checked',
          'value': 0
        }
      ]
    },
    {
      'number': '5',
      'question': 'Imagine you are 30. How many times have you applied for a loan or new credit card in the past 6 months?',
      'answers': [
        {
          'text': '0 or 1 time',
          'value': 55
        },
        {
          'text': '2 times',
          'value': 45
        },
        {
          'text': '3 times ',
          'value': 35
        },
        {
          'text': '4 times ',
          'value': 25
        },
        {
          'text': '5 times ',
          'value': 10
        },
        {
          'text': 'More than 5 times',
          'value': 0
        }
      ]
    }
  ];

  return new SurveyCollection(survey, { type: 'postSurvey' });
});
