/*global define*/

define([
  'collections/survey'
], function (SurveyCollection) {
  'use strict';

  var survey = [
    {
      'number': '1',
      'question': 'What was your score on the most recent test in this class?',
      'answers': [
        {
          'text': '95-100',
          'value': 200
        },
        {
          'text': '90-94',
          'value': 180
        },
        {
          'text': '85-89',
          'value': 160
        },
        {
          'text': '80-84',
          'value': 140
        },
        {
          'text': '75-79',
          'value': 120
        },
        {
          'text': '70-74',
          'value': 100
        },
        {
          'text': '65-69',
          'value': 80
        },
        {
          'text': '60-64',
          'value': 60
        },
        {
          'text': 'Below 60',
          'value': 40
        }
      ]
    },
    {
      'number': '2',
      'question': 'In this class, how many assignments have you missed OR turned in late?',
      'answers': [
        {
          'text': 'I have never missed an assignment',
          'value': 160
        },
        {
          'text': '1-2',
          'value': 120
        },
        {
          'text': '3-5',
          'value': 100
        },
        {
          'text': '7-9',
          'value': 80
        },
        {
          'text': '10-12',
          'value': 60
        },
        {
          'text': '13-15',
          'value': 40
        },
        {
          'text': 'More than 15',
          'value': 0
        }
      ]
    },
    {
      'number': '3',
      'question': 'At what age did you first save some of your OWN money? (Savings can kept in many places, from piggy bank to bank savings account.)',
      'answers': [
        {
          'text': '6 or younger',
          'value': 80
        },
        {
          'text': '7-10',
          'value': 70
        },
        {
          'text': '11-13',
          'value': 60
        },
        {
          'text': '14-16',
          'value': 50
        },
        {
          'text': '17-18',
          'value': 40
        },
        {
          'text': 'I have never saved my own money',
          'value': 0
        }
      ]
    },
    {
      'number': '4',
      'question': 'In how many clubs/organizations are you involved this year? These may include school sports teams and clubs, community organizations, jobs, religious and political groups.',
      'answers': [
        {
          'text': '8 or more',
          'value': 55
        },
        {
          'text': '6-7',
          'value': 50
        },
        {
          'text': '4-5',
          'value': 45
        },
        {
          'text': '3',
          'value': 35
        },
        {
          'text': '2',
          'value': 25
        },
        {
          'text': '1',
          'value': 10
        },
        {
          'text': 'None',
          'value': 0
        }
      ]
    },
    {
      'number': '5',
      'question': 'When was the last time you asked your parents for money (not for a required school activity)?',
      'answers': [
        {
          'text': 'I never ask my parents for money',
          'value': 55
        },
        {
          'text': 'More than 6 months ago',
          'value': 45
        },
        {
          'text': 'Approximately 4-6 months ago',
          'value': 35
        },
        {
          'text': 'Approximately 2-4 months ago',
          'value': 25
        },
        {
          'text': 'Approximately 1-2 months ago',
          'value': 10
        },
        {
          'text': 'Within the last month',
          'value': 0
        }
      ]
    }
  ];

  return new SurveyCollection(survey, { type: 'preSurvey' });
});
